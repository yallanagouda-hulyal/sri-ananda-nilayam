const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AdminUser = require('../models/AdminUser');
const { asyncHandler } = require('../middleware/errorHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const sendTokenCookie = (res, token) => {
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  };
  res.cookie('adminToken', token, options);
};

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password required' });

  const user = await AdminUser.findOne({ email }).select('+password +loginAttempts +lockUntil');
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  if (user.isLocked()) {
    return res.status(429).json({ success: false, message: 'Account locked. Try again later.' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
    await user.save({ validateBeforeSave: false });
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (!user.isActive)
    return res.status(403).json({ success: false, message: 'Account inactive' });

  user.loginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken(user._id);
  sendTokenCookie(res, token);
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user,
    data: { user, token },
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie('adminToken', '', { expires: new Date(0), httpOnly: true });
  res.json({ success: true, message: 'Logged out' });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user, data: req.user });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await AdminUser.findOne({ email: req.body.email });
  if (!user) return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  // In production, send email here
  res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await AdminUser.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+passwordResetToken +passwordResetExpires');

  if (!user) return res.status(400).json({ success: false, message: 'Token invalid or expired' });

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);
  sendTokenCookie(res, token);
  res.json({ success: true, message: 'Password reset successful' });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const user = await AdminUser.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(req.body.currentPassword);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Current password incorrect' });
  user.password = req.body.newPassword;
  await user.save();
  res.json({ success: true, message: 'Password changed successfully' });
});

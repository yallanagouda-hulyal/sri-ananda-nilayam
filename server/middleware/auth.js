const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const { asyncHandler } = require('./errorHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Try cookie first, then Authorization header
  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AdminUser.findById(decoded.id).select('-password');

  if (!user || !user.isActive) {
    return res.status(401).json({ success: false, message: 'User not found or inactive' });
  }

  req.user = user;
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  }
  next();
};

const superAdminOnly = authorize('super_admin');

module.exports = { protect, authorize, superAdminOnly };

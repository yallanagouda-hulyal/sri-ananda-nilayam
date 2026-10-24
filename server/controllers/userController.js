const AdminUser = require('../models/AdminUser');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await AdminUser.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await AdminUser.create({ name, email, password, role });
  res.status(201).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { name, role, isActive } = req.body;
  const user = await AdminUser.findByIdAndUpdate(
    req.params.id,
    { name, role, isActive },
    { new: true, runValidators: true }
  );
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString())
    return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
  await AdminUser.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await AdminUser.findByIdAndUpdate(req.user._id, { name }, { new: true });
  res.json({ success: true, data: user });
});

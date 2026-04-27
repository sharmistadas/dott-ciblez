const Admin = require('../models/admin.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Admin Login
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = admin.generateToken();

  // Set token in cookie as well
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      admin: { id: admin._id, name: admin.name, email: admin.email },
      token,
    },
  });
});

/**
 * @desc    Admin Logout (clear cookie)
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (_req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * @desc    Get current admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  res.json({ success: true, data: { admin } });
});

/**
 * @desc    Update admin password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Please provide current and new password', 400);
  }

  const admin = await Admin.findById(req.admin.id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 401);
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ success: true, message: 'Password updated successfully' });
});

module.exports = { login, logout, getMe, changePassword };

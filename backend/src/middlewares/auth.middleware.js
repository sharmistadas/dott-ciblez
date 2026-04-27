const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * Protect routes – admin must be logged in
 */
const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError('Not authorized – no token provided', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new AppError('Admin belonging to this token no longer exists', 401);
  }

  req.admin = admin;
  next();
});

/**
 * Optional auth – attaches admin to req if token is present, but doesn't block
 * Useful for routes that behave differently for admin vs public
 */
const optionalAuth = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id);
      if (admin) req.admin = admin;
    } catch {
      // Token invalid – proceed as public user
    }
  }

  next();
});

module.exports = { protect, optionalAuth };

const multer = require('multer');
const path = require('path');
const { AppError } = require('../utils/appError');

// ── Team Photo Upload Config ──
const photoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/team'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `team-${uniqueSuffix}${ext}`);
  },
});

const photoFilter = (_req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Only JPEG, PNG, and WebP images are allowed', 400), false);
  }
};

const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: photoFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

// ── Blog Image Upload Config ──
const blogImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/blogs'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `blog-${uniqueSuffix}${ext}`);
  },
});

const uploadBlogImage = multer({
  storage: blogImageStorage,
  fileFilter: photoFilter, // Same image types
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = { uploadPhoto, uploadBlogImage };

const Blog = require('../models/blog.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

const normalizeBlogBooleans = (body) => {
  ['isActive', 'isFeatured', 'isTrending'].forEach((field) => {
    if (typeof body[field] === 'string') {
      body[field] = body[field] === 'true';
    }
  });
};

/**
 * @desc    Get all blogs (public – active only; admin – all)
 * @route   GET /api/blogs
 * @access  Public / Admin
 */
const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = req.admin ? {} : { isActive: true };

  if (req.query.category && req.query.category !== 'All') {
    filter.category = { $regex: new RegExp(req.query.category, 'i') };
  }
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.trending === 'true') filter.isTrending = true;

  const blogs = await Blog.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(filter);

  res.json({
    success: true,
    data: {
      blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Get single blog
 * @route   GET /api/blogs/:id
 * @access  Public
 */
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, data: { blog } });
});

/**
 * @desc    Create blog
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
const createBlog = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/blogs/${req.file.filename}`;
  }
  normalizeBlogBooleans(req.body);

  const blog = await Blog.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: { blog },
  });
});

/**
 * @desc    Update blog
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
const updateBlog = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/blogs/${req.file.filename}`;
  }
  normalizeBlogBooleans(req.body);

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({
    success: true,
    message: 'Blog updated successfully',
    data: { blog },
  });
});

/**
 * @desc    Delete blog
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, message: 'Blog deleted successfully' });
});

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };

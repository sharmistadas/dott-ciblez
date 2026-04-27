const router = require('express').Router();
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { uploadBlogImage } = require('../middlewares/upload.middleware');
const { validate } = require('../middlewares/validate.middleware');

const blogSchema = {
  title: { required: true, maxLength: 200 },
  category: { required: true },
  description: { required: true },
};

// Public (optionalAuth so admin sees inactive blogs too)
router.get('/', optionalAuth, getAllBlogs);
router.get('/:id', getBlog);

// Admin-only
router.post('/', protect, uploadBlogImage.single('image'), validate(blogSchema), createBlog);
router.put('/:id', protect, uploadBlogImage.single('image'), updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;

const router = require('express').Router();
const {
  submitInquiry,
  getAllInquiries,
  getInquiry,
  deleteInquiry,
} = require('../controllers/inquiry.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const inquirySchema = {
  name: { required: true, maxLength: 100 },
  email: { required: true, isEmail: true },
  message: { required: true },
};

// Public – contact form submission (matches Contact.jsx)
router.post('/', validate(inquirySchema), submitInquiry);

// Admin-only
router.get('/', protect, getAllInquiries);
router.get('/:id', protect, getInquiry);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;

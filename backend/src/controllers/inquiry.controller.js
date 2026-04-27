const Inquiry = require('../models/inquiry.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Submit a contact inquiry (from Contact.jsx)
 * @route   POST /api/inquiries
 * @access  Public
 */
const submitInquiry = asyncHandler(async (req, res) => {
  const { name, company, email, message } = req.body;

  const inquiry = await Inquiry.create({ name, company, email, message });

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted. We will get back to you shortly.',
    data: { inquiryId: inquiry._id },
  });
});

/**
 * @desc    Get all inquiries (admin dashboard)
 * @route   GET /api/inquiries
 * @access  Private (Admin)
 */
const getAllInquiries = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.isRead === 'true') filter.isRead = true;
  if (req.query.isRead === 'false') filter.isRead = false;

  const inquiries = await Inquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Inquiry.countDocuments(filter);
  const unreadCount = await Inquiry.countDocuments({ isRead: false });

  res.json({
    success: true,
    data: {
      inquiries,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Get single inquiry
 * @route   GET /api/inquiries/:id
 * @access  Private (Admin)
 */
const getInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) throw new AppError('Inquiry not found', 404);

  // Mark as read when admin views it
  if (!inquiry.isRead) {
    inquiry.isRead = true;
    await inquiry.save();
  }

  res.json({ success: true, data: { inquiry } });
});

/**
 * @desc    Delete inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Private (Admin)
 */
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) throw new AppError('Inquiry not found', 404);
  res.json({ success: true, message: 'Inquiry deleted successfully' });
});

module.exports = { submitInquiry, getAllInquiries, getInquiry, deleteInquiry };

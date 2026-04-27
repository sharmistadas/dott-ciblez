const Newsletter = require('../models/newsletter.model');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Subscribe to newsletter (from Career CTA & Blog newsletter)
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
const subscribe = asyncHandler(async (req, res) => {
  const { email, source } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Check if already subscribed
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return res.json({ success: true, message: 'You are already subscribed!' });
  }

  await Newsletter.create({ email, source: source || 'other' });

  res.status(201).json({
    success: true,
    message: 'Thank you for subscribing!',
  });
});

/**
 * @desc    Get all subscribers (admin)
 * @route   GET /api/newsletter
 * @access  Private (Admin)
 */
const getAllSubscribers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const subscribers = await Newsletter.find({ isActive: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Newsletter.countDocuments({ isActive: true });

  res.json({
    success: true,
    data: {
      subscribers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Delete subscriber
 * @route   DELETE /api/newsletter/:id
 * @access  Private (Admin)
 */
const deleteSubscriber = asyncHandler(async (req, res) => {
  await Newsletter.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Subscriber removed' });
});

module.exports = { subscribe, getAllSubscribers, deleteSubscriber };

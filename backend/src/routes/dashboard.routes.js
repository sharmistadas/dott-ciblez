const router = require('express').Router();
const { protect } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../utils/asyncHandler');
const Job = require('../models/job.model');
const Application = require('../models/application.model');
const Inquiry = require('../models/inquiry.model');
const TeamMember = require('../models/teamMember.model');
const ServiceBooking = require('../models/serviceBooking.model');
const Blog = require('../models/blog.model');
const Newsletter = require('../models/newsletter.model');

/**
 * @desc    Get dashboard summary stats for admin panel
 * @route   GET /api/dashboard
 * @access  Private (Admin)
 */
router.get(
  '/',
  protect,
  asyncHandler(async (_req, res) => {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      totalInquiries,
      unreadInquiries,
      totalTeamMembers,
      totalBookings,
      pendingBookings,
      totalBlogs,
      totalSubscribers,
    ] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ isRead: false }),
      TeamMember.countDocuments({ isActive: true }),
      ServiceBooking.countDocuments(),
      ServiceBooking.countDocuments({ status: 'pending' }),
      Blog.countDocuments({ isActive: true }),
      Newsletter.countDocuments({ isActive: true }),
    ]);

    // Recent applications (latest 5)
    const recentApplications = await Application.find()
      .populate('job', 'title department')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Recent inquiries (latest 5)
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Recent bookings (latest 5)
    const recentBookings = await ServiceBooking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        stats: {
          jobs: { total: totalJobs, active: activeJobs },
          applications: { total: totalApplications, pending: pendingApplications },
          inquiries: { total: totalInquiries, unread: unreadInquiries },
          teamMembers: totalTeamMembers,
          bookings: { total: totalBookings, pending: pendingBookings },
          blogs: totalBlogs,
          subscribers: totalSubscribers,
        },
        recentApplications,
        recentInquiries,
        recentBookings,
      },
    });
  })
);

module.exports = router;

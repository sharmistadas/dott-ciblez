const Application = require('../models/application.model');
const Job = require('../models/job.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Submit a job application (public – from JobApplication.jsx)
 * @route   POST /api/applications
 * @access  Public
 */
const applyForJob = asyncHandler(async (req, res) => {
  const {
    job,
    fullName,
    email,
    phone,
    currentJobTitle,
    totalExperience,
    linkedinUrl,
    skills,
    availability,
    workMode,
    noticePeriod,
    expectedSalary,
    portfolioUrl,
    coverNote,
  } = req.body;

  // Verify job exists and is active
  const jobDoc = await Job.findById(job);
  if (!jobDoc || !jobDoc.isActive) {
    throw new AppError('Job not found or no longer accepting applications', 404);
  }

  const application = await Application.create({
    job,
    fullName,
    email,
    phone,
    currentJobTitle: currentJobTitle || '',
    totalExperience: totalExperience || 0,
    linkedinUrl: linkedinUrl || '',
    skills: skills || [],
    availability: availability || '',
    workMode: workMode || '',
    noticePeriod: noticePeriod || '',
    expectedSalary: expectedSalary || '',
    portfolioUrl: portfolioUrl || '',
    coverNote: coverNote || '',
  });

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: { applicationId: application._id },
  });
});

/**
 * @desc    Get all applications (admin dashboard)
 * @route   GET /api/applications
 * @access  Private (Admin)
 */
const getAllApplications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.job) filter.job = req.query.job;

  const applications = await Application.find(filter)
    .populate('job', 'title department location type salary')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Application.countDocuments(filter);

  res.json({
    success: true,
    data: {
      applications,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Get single application
 * @route   GET /api/applications/:id
 * @access  Private (Admin)
 */
const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate(
    'job',
    'title department location type salary'
  );
  if (!application) throw new AppError('Application not found', 404);
  res.json({ success: true, data: { application } });
});

/**
 * @desc    Update application status
 * @route   PUT /api/applications/:id/status
 * @access  Private (Admin)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected'];

  if (!status || !validStatuses.includes(status)) {
    throw new AppError(`Status must be one of: ${validStatuses.join(', ')}`, 400);
  }

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate('job', 'title department');

  if (!application) throw new AppError('Application not found', 404);

  res.json({
    success: true,
    message: `Application status updated to ${status}`,
    data: { application },
  });
});

/**
 * @desc    Delete application
 * @route   DELETE /api/applications/:id
 * @access  Private (Admin)
 */
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);
  if (!application) throw new AppError('Application not found', 404);
  res.json({ success: true, message: 'Application deleted successfully' });
});

module.exports = {
  applyForJob,
  getAllApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
};

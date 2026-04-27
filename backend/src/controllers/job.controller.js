const Job = require('../models/job.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Get all jobs (public – only active jobs; admin – all jobs)
 * @route   GET /api/jobs
 * @access  Public / Admin
 */
const getAllJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // If admin is set on request, show all; otherwise only active
  const filter = req.admin ? {} : { isActive: true };

  if (req.query.department) filter.department = req.query.department;
  if (req.query.type) filter.type = req.query.type;
  if (req.query.search) {
    filter.title = { $regex: req.query.search, $options: 'i' };
  }

  const jobs = await Job.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments(filter);

  res.json({
    success: true,
    data: {
      jobs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Get single job
 * @route   GET /api/jobs/:id
 * @access  Public
 */
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new AppError('Job not found', 404);
  res.json({ success: true, data: { job } });
});

/**
 * @desc    Create a job
 * @route   POST /api/jobs
 * @access  Private (Admin)
 */
const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Job created successfully',
    data: { job },
  });
});

/**
 * @desc    Update a job
 * @route   PUT /api/jobs/:id
 * @access  Private (Admin)
 */
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) throw new AppError('Job not found', 404);
  res.json({
    success: true,
    message: 'Job updated successfully',
    data: { job },
  });
});

/**
 * @desc    Delete a job
 * @route   DELETE /api/jobs/:id
 * @access  Private (Admin)
 */
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) throw new AppError('Job not found', 404);
  res.json({ success: true, message: 'Job deleted successfully' });
});

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };

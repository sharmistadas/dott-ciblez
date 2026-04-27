const TeamMember = require('../models/teamMember.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

const normalizePayload = (body) => {
  const next = { ...body };

  if (typeof next.socialLinks === 'string') {
    try {
      next.socialLinks = JSON.parse(next.socialLinks);
    } catch {
      // leave as-is if parsing fails
    }
  }

  if (typeof next.isActive === 'string') {
    next.isActive = next.isActive === 'true';
  }

  if (typeof next.order === 'string') {
    const orderNum = Number(next.order);
    if (!Number.isNaN(orderNum)) next.order = orderNum;
  }

  return next;
};

/**
 * @desc    Get all team members (public – active only; admin – all)
 * @route   GET /api/team
 * @access  Public / Admin
 */
const getAllMembers = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { isActive: true };

  // Support category filter from MeetTheTeam.jsx
  if (req.query.category && req.query.category !== 'All') {
    filter.category = req.query.category;
  }

  const members = await TeamMember.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: { members } });
});

/**
 * @desc    Get single team member
 * @route   GET /api/team/:id
 * @access  Public
 */
const getMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) throw new AppError('Team member not found', 404);
  res.json({ success: true, data: { member } });
});

/**
 * @desc    Create team member
 * @route   POST /api/team
 * @access  Private (Admin)
 */
const createMember = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.avatar = `/uploads/team/${req.file.filename}`;
  }

  const payload = normalizePayload(req.body);
  const member = await TeamMember.create(payload);
  res.status(201).json({
    success: true,
    message: 'Team member added successfully',
    data: { member },
  });
});

/**
 * @desc    Update team member
 * @route   PUT /api/team/:id
 * @access  Private (Admin)
 */
const updateMember = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.avatar = `/uploads/team/${req.file.filename}`;
  }

  const payload = normalizePayload(req.body);
  const member = await TeamMember.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!member) throw new AppError('Team member not found', 404);
  res.json({
    success: true,
    message: 'Team member updated successfully',
    data: { member },
  });
});

/**
 * @desc    Delete team member
 * @route   DELETE /api/team/:id
 * @access  Private (Admin)
 */
const deleteMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) throw new AppError('Team member not found', 404);
  res.json({ success: true, message: 'Team member deleted successfully' });
});

module.exports = { getAllMembers, getMember, createMember, updateMember, deleteMember };

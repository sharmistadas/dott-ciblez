const ServiceBooking = require('../models/serviceBooking.model');
const { AppError } = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Submit a service booking (from ServiceBooking.jsx)
 * @route   POST /api/bookings
 * @access  Public
 */
const createBooking = asyncHandler(async (req, res) => {
  const { service, fullName, email, company, phone, bookingDate, bookingTime } = req.body;

  const booking = await ServiceBooking.create({
    service,
    fullName,
    email,
    company: company || '',
    phone: phone || '',
    bookingDate,
    bookingTime,
  });

  res.status(201).json({
    success: true,
    message: `Thank you, ${fullName}! Your ${service} booking (${bookingDate} at ${bookingTime}) is received. Our team will contact you at ${email}.`,
    data: { bookingId: booking._id },
  });
});

/**
 * @desc    Get all bookings (admin dashboard)
 * @route   GET /api/bookings
 * @access  Private (Admin)
 */
const getAllBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.service) filter.service = req.query.service;

  const bookings = await ServiceBooking.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await ServiceBooking.countDocuments(filter);
  const unreadCount = await ServiceBooking.countDocuments({ isRead: false });

  res.json({
    success: true,
    data: {
      bookings,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    },
  });
});

/**
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private (Admin)
 */
const getBooking = asyncHandler(async (req, res) => {
  const booking = await ServiceBooking.findById(req.params.id);
  if (!booking) throw new AppError('Booking not found', 404);

  if (!booking.isRead) {
    booking.isRead = true;
    await booking.save();
  }

  res.json({ success: true, data: { booking } });
});

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id/status
 * @access  Private (Admin)
 */
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    throw new AppError(`Status must be one of: ${validStatuses.join(', ')}`, 400);
  }

  const booking = await ServiceBooking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!booking) throw new AppError('Booking not found', 404);

  res.json({
    success: true,
    message: `Booking status updated to ${status}`,
    data: { booking },
  });
});

/**
 * @desc    Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Private (Admin)
 */
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
  if (!booking) throw new AppError('Booking not found', 404);
  res.json({ success: true, message: 'Booking deleted successfully' });
});

module.exports = { createBooking, getAllBookings, getBooking, updateBookingStatus, deleteBooking };

const router = require('express').Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/serviceBooking.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const bookingSchema = {
  service: { required: true },
  fullName: { required: true, maxLength: 100 },
  email: { required: true, isEmail: true },
  bookingDate: { required: true },
  bookingTime: { required: true },
};

// Public – from ServiceBooking.jsx
router.post('/', validate(bookingSchema), createBooking);

// Admin-only
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/status', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;

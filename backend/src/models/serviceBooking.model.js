const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    bookingDate: {
      type: String,
      required: [true, 'Booking date is required'],
    },
    bookingTime: {
      type: String,
      required: [true, 'Booking time is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);

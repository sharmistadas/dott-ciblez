const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    source: {
      type: String,
      enum: ['career', 'blog', 'other'],
      default: 'other',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Newsletter', newsletterSchema);

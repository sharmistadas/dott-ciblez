const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job reference is required'],
    },
    // ── Step 1: Personal Info ──
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
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    // ── Step 2: Professional Details ──
    currentJobTitle: {
      type: String,
      trim: true,
      default: '',
    },
    totalExperience: {
      type: Number,
      default: 0,
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },
    // ── Step 3: Documents ──
    // Resume is sent via email/WhatsApp per frontend design
    // We still store reference info if provided
    resumeSubmittedVia: {
      type: String,
      enum: ['email', 'whatsapp', 'upload', ''],
      default: '',
    },
    // ── Step 4: Skills Assessment ──
    skills: [
      {
        name: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    availability: {
      type: String,
      enum: ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', '3+ months', ''],
      default: '',
    },
    workMode: {
      type: String,
      enum: ['Full Remote', 'Hybrid', 'On-site', 'Flexible', ''],
      default: '',
    },
    noticePeriod: {
      type: String,
      trim: true,
      default: '',
    },
    expectedSalary: {
      type: String,
      trim: true,
      default: '',
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: '',
    },
    coverNote: {
      type: String,
      trim: true,
      maxlength: [800, 'Cover note cannot exceed 800 characters'],
      default: '',
    },
    // ── Admin tracking ──
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Leadership', 'Engineering', 'Design', 'Product', 'Marketing'],
      default: 'Engineering',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String, // URL or file path
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    socialLinks: {
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    order: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('TeamMember', teamMemberSchema);

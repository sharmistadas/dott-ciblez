const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    cardCategory: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      trim: true,
      default: 'Dott Ciblez Team',
    },
    readTime: {
      type: String,
      trim: true,
      default: '5 Min Read',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Blog', blogSchema);

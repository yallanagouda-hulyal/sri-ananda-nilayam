const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  category: { type: String, enum: ['exterior', 'interior', 'construction', 'renovation', 'kitchen', 'all'], default: 'all' },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  fileSize: Number,
  dimensions: { width: Number, height: Number },
}, { timestamps: true });

galleryImageSchema.index({ category: 1, order: 1 });
galleryImageSchema.index({ isPublished: 1 });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);

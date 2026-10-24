const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  clientTitle: { type: String, default: '' },
  photo: { type: String, default: '' },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  projectCategory: { type: String, default: '' },
  projectTitle: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

testimonialSchema.index({ isPublished: 1, order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);

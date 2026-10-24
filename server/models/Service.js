const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: true });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  shortDescription: { type: String, required: true, maxlength: 500 },
  description: { type: String, required: true },
  coverImage: { type: String, default: '' },
  coverImageAlt: { type: String, default: '' },
  benefits: [{ type: String }],
  process: [{ step: Number, title: String, description: String }],
  faqs: [faqSchema],
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

serviceSchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);

const mongoose = require('mongoose');

const projectImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: String,
  caption: String,
  order: { type: Number, default: 0 },
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, enum: ['residential', 'commercial', 'interior', 'renovation', 'ongoing', 'completed'], required: true },
  location: { type: String, trim: true },
  shortDescription: { type: String, maxlength: 500 },
  description: { type: String },
  coverImage: { type: String, default: '' },
  coverImageAlt: { type: String, default: '' },
  images: [projectImageSchema],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  projectStatus: { type: String, enum: ['ongoing', 'completed', 'planning'], default: 'completed' },
  completionDate: Date,
  area: String,
  client: String,
  isFeatured: { type: Boolean, default: false },
  tags: [String],
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

projectSchema.index({ status: 1, category: 1 });
projectSchema.index({ isFeatured: 1, status: 1 });

module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed },
  metaTitle: String,
  metaDescription: String,
  ogImage: String,
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });


module.exports = mongoose.model('PageContent', pageContentSchema);

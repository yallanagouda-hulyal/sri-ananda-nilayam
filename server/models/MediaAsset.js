const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: String,
  url: { type: String, required: true },
  mimeType: String,
  size: Number,
  dimensions: { width: Number, height: Number },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  folder: { type: String, default: 'general' },
  alt: String,
  caption: String,
  tags: [String],
}, { timestamps: true });

mediaAssetSchema.index({ folder: 1, createdAt: -1 });

module.exports = mongoose.model('MediaAsset', mediaAssetSchema);

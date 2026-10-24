const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
  group: { type: String, default: 'general' },
  label: String,
  type: { type: String, enum: ['string', 'number', 'boolean', 'json', 'image'], default: 'string' },
}, { timestamps: true });

siteSettingsSchema.index({ group: 1 });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);

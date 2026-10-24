const SiteSettings = require('../models/SiteSettings');
const PageContent = require('../models/PageContent');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getAllSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.find({});
  res.json({ success: true, data: settings });
});

exports.updateSetting = asyncHandler(async (req, res) => {
  const { key, value } = req.body;
  const setting = await SiteSettings.findOneAndUpdate(
    { key },
    { key, value },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: setting });
});

exports.bulkUpdateSettings = asyncHandler(async (req, res) => {
  const { settings } = req.body; // [{ key, value }]
  await Promise.all(settings.map(s =>
    SiteSettings.findOneAndUpdate({ key: s.key }, { key: s.key, value: s.value }, { upsert: true, new: true })
  ));
  res.json({ success: true, message: 'Settings updated' });
});

exports.getPageContent = asyncHandler(async (req, res) => {
  const pages = await PageContent.find({});
  res.json({ success: true, data: pages });
});

exports.updatePageContent = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const page = await PageContent.findOneAndUpdate(
    { slug },
    req.body,
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: page });
});

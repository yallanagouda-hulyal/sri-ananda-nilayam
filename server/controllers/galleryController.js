const GalleryImage = require('../models/GalleryImage');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getImages = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 50 } = req.query;
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  const skip = (page - 1) * limit;
  const [images, total] = await Promise.all([
    GalleryImage.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    GalleryImage.countDocuments(filter),
  ]);
  res.json({ success: true, data: images, total });
});

exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const { alt, caption, category } = req.body;
  const image = await GalleryImage.create({
    url: `/uploads/gallery/${req.file.filename}`,
    alt: alt || '',
    caption: caption || '',
    category: category || 'all',
    fileSize: req.file.size,
  });
  res.status(201).json({ success: true, data: image });
});

exports.updateImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
  res.json({ success: true, data: image });
});

exports.deleteImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
  res.json({ success: true, message: 'Image deleted' });
});

exports.bulkDelete = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await GalleryImage.deleteMany({ _id: { $in: ids } });
  res.json({ success: true, message: `${ids.length} images deleted` });
});

exports.reorderImages = asyncHandler(async (req, res) => {
  const { orders } = req.body; // [{ id, order }]
  await Promise.all(orders.map(o => GalleryImage.findByIdAndUpdate(o.id, { order: o.order })));
  res.json({ success: true, message: 'Order updated' });
});

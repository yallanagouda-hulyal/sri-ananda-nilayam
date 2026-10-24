const Testimonial = require('../models/Testimonial');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

exports.createTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/testimonials/${req.file.filename}`;
  const t = await Testimonial.create(data);
  res.status(201).json({ success: true, data: t });
});

exports.updateTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/testimonials/${req.file.filename}`;
  const t = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, data: t });
});

exports.deleteTestimonial = asyncHandler(async (req, res) => {
  const t = await Testimonial.findByIdAndDelete(req.params.id);
  if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, message: 'Deleted' });
});

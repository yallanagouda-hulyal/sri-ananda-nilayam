const Service = require('../models/Service');
const slugify = require('slugify');
const { asyncHandler } = require('../middleware/errorHandler');
const path = require('path');
const fs = require('fs');

exports.getServices = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const skip = (page - 1) * limit;
  const [services, total] = await Promise.all([
    Service.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Service.countDocuments(filter),
  ]);
  res.json({ success: true, data: services, total });
});

exports.getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
});

exports.createService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.title, { lower: true, strict: true });
  if (req.file) data.coverImage = `/uploads/services/${req.file.filename}`;
  if (typeof data.benefits === 'string') data.benefits = JSON.parse(data.benefits);
  if (typeof data.process === 'string') data.process = JSON.parse(data.process);
  if (typeof data.faqs === 'string') data.faqs = JSON.parse(data.faqs);
  const service = await Service.create(data);
  res.status(201).json({ success: true, data: service });
});

exports.updateService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.coverImage = `/uploads/services/${req.file.filename}`;
  if (typeof data.benefits === 'string') data.benefits = JSON.parse(data.benefits);
  if (typeof data.process === 'string') data.process = JSON.parse(data.process);
  if (typeof data.faqs === 'string') data.faqs = JSON.parse(data.faqs);
  const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
});

exports.deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, message: 'Service deleted' });
});

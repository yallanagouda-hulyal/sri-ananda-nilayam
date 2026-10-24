const Project = require('../models/Project');
const slugify = require('slugify');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getProjects = asyncHandler(async (req, res) => {
  const { status, category, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (category && category !== 'all') filter.category = category;
  const skip = (page - 1) * limit;
  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ isFeatured: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Project.countDocuments(filter),
  ]);
  res.json({ success: true, data: projects, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
});

exports.createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.title, { lower: true, strict: true });
  if (req.file) data.coverImage = `/uploads/projects/${req.file.filename}`;
  if (typeof data.images === 'string') data.images = JSON.parse(data.images);
  if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
  const project = await Project.create(data);
  res.status(201).json({ success: true, data: project });
});

exports.updateProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.coverImage = `/uploads/projects/${req.file.filename}`;
  if (typeof data.images === 'string') data.images = JSON.parse(data.images);
  if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
  const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, message: 'Project deleted' });
});

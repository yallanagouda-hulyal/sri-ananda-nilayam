const Service = require('../models/Service');
const Project = require('../models/Project');
const GalleryImage = require('../models/GalleryImage');
const Testimonial = require('../models/Testimonial');
const Enquiry = require('../models/Enquiry');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const SiteSettings = require('../models/SiteSettings');
const PageContent = require('../models/PageContent');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.find({});
  const map = {};
  settings.forEach(s => { map[s.key] = s.value; });
  res.json({ success: true, data: map });
});

exports.getPageContent = asyncHandler(async (req, res) => {
  const page = await PageContent.findOne({ slug: req.params.slug, status: 'published' });
  if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
  res.json({ success: true, data: page });
});

exports.getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ status: 'published' }).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: services });
});

exports.getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, status: 'published' });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
});

exports.getProjects = asyncHandler(async (req, res) => {
  const { category, featured, page = 1, limit = 12 } = req.query;
  const filter = { status: 'published' };
  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  const skip = (page - 1) * limit;
  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ isFeatured: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Project.countDocuments(filter),
  ]);
  res.json({ success: true, data: projects, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
});

exports.getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  const related = await Project.find({ category: project.category, status: 'published', _id: { $ne: project._id } }).limit(3);
  res.json({ success: true, data: project, related });
});

exports.getGallery = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'all') filter.category = category;
  const images = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: images });
});

exports.getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

exports.submitEnquiry = asyncHandler(async (req, res) => {
  const { fullName, phone, email, serviceRequired, projectLocation, estimatedBudget, message, preferredContactMethod } = req.body;
  if (!fullName || !phone) return res.status(400).json({ success: false, message: 'Name and phone are required' });
  const enquiry = await Enquiry.create({
    fullName, phone, email, serviceRequired, projectLocation, estimatedBudget, message,
    preferredContactMethod: preferredContactMethod || 'WhatsApp',
    ipAddress: req.ip,
    statusHistory: [{ status: 'new', changedAt: new Date() }],
  });
  res.status(201).json({ success: true, message: 'Enquiry submitted successfully', id: enquiry._id });
});

exports.subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  try {
    await NewsletterSubscriber.create({ email });
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (e) {
    if (e.code === 11000) return res.json({ success: true, message: 'Already subscribed' });
    throw e;
  }
});

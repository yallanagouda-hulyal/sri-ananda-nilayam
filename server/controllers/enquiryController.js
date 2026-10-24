const Enquiry = require('../models/Enquiry');
const EnquiryNote = require('../models/EnquiryNote');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getEnquiries = asyncHandler(async (req, res) => {
  const { status, service, search, page = 1, limit = 20, startDate, endDate } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (service) filter.serviceRequired = { $regex: service, $options: 'i' };
  if (search) filter.$or = [
    { fullName: { $regex: search, $options: 'i' } },
    { phone: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ];
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  const skip = (page - 1) * limit;
  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('assignedTo', 'name'),
    Enquiry.countDocuments(filter),
  ]);
  res.json({ success: true, data: enquiries, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
});

exports.getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id).populate('assignedTo', 'name email');
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  const notes = await EnquiryNote.find({ enquiry: enquiry._id }).populate('author', 'name').sort({ createdAt: -1 });
  res.json({ success: true, data: enquiry, notes });
});

exports.updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status, assignedTo, followUpDate, note } = req.body;
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  const historyEntry = { status: status || enquiry.status, changedBy: req.user._id, changedAt: new Date(), note };
  if (status) enquiry.status = status;
  if (assignedTo !== undefined) enquiry.assignedTo = assignedTo || null;
  if (followUpDate !== undefined) enquiry.followUpDate = followUpDate || null;
  enquiry.statusHistory.push(historyEntry);
  await enquiry.save();
  res.json({ success: true, data: enquiry });
});

exports.addNote = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  const note = await EnquiryNote.create({ enquiry: enquiry._id, author: req.user._id, text: req.body.text });
  await note.populate('author', 'name');
  res.status(201).json({ success: true, data: note });
});

exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  await EnquiryNote.deleteMany({ enquiry: req.params.id });
  res.json({ success: true, message: 'Enquiry deleted' });
});

exports.exportEnquiries = asyncHandler(async (req, res) => {
  const { status, startDate, endDate } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).populate('assignedTo', 'name');
  const headers = 'Name,Phone,Email,Service,Location,Budget,Status,Date\n';
  const rows = enquiries.map(e =>
    `"${e.fullName}","${e.phone}","${e.email || ''}","${e.serviceRequired || ''}","${e.projectLocation || ''}","${e.estimatedBudget || ''}","${e.status}","${new Date(e.createdAt).toLocaleDateString()}"`
  ).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=enquiries-${Date.now()}.csv`);
  res.send(headers + rows);
});

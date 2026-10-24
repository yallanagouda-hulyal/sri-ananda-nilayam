const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getSubscribers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, isActive } = req.query;
  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  const skip = (page - 1) * limit;
  const [subscribers, total] = await Promise.all([
    NewsletterSubscriber.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(parseInt(limit)),
    NewsletterSubscriber.countDocuments(filter),
  ]);
  res.json({ success: true, data: subscribers, total });
});

exports.exportSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.find({ isActive: true }).sort({ subscribedAt: -1 });
  const csv = 'Email,Date\n' + subscribers.map(s =>
    `"${s.email}","${new Date(s.subscribedAt).toLocaleDateString()}"`
  ).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=subscribers-${Date.now()}.csv`);
  res.send(csv);
});

exports.unsubscribe = asyncHandler(async (req, res) => {
  await NewsletterSubscriber.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true, message: 'Unsubscribed' });
});

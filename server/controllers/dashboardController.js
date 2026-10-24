const Enquiry = require('../models/Enquiry');
const Project = require('../models/Project');
const Service = require('../models/Service');
const GalleryImage = require('../models/GalleryImage');
const Testimonial = require('../models/Testimonial');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const Appointment = require('../models/Appointment');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [
    enquiryStats,
    projectStats,
    serviceCount,
    galleryCount,
    testimonialCount,
    subscriberCount,
    appointmentCount,
    recentEnquiries,
    recentProjects,
    projectsByCategoryAgg,
    projectsByStatusAgg,
    monthlyTrendAgg,
  ] = await Promise.all([
    // 1. Group enquiries by status
    Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    // 2. Group projects by publication status
    Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    // 3. Simple counts
    Service.countDocuments({}),
    GalleryImage.countDocuments({ isPublished: true }),
    Testimonial.countDocuments({ isPublished: true }),
    NewsletterSubscriber.countDocuments({ isActive: true }),
    Appointment.countDocuments({ status: 'scheduled' }),

    // 4. Recent Enquiries
    Enquiry.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('assignedTo', 'name'),

    // 5. Recent Projects
    Project.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug category location projectStatus status coverImage area completionDate'),

    // 6. Projects grouped by category
    Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]),

    // 7. Projects grouped by execution stage
    Project.aggregate([
      { $group: { _id: '$projectStatus', count: { $sum: 1 } } },
    ]),

    // 8. Monthly enquiry aggregation for this year
    Enquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]),
  ]);

  // Format enquiry counts
  const enquiryCounts = { total: 0, new: 0, contacted: 0, qualified: 0, converted: 0, closed: 0 };
  enquiryStats.forEach((s) => {
    enquiryCounts[s._id] = s.count;
    enquiryCounts.total += s.count;
  });

  // Format project counts
  const projectCounts = { total: 0, published: 0, draft: 0 };
  projectStats.forEach((s) => {
    projectCounts[s._id] = s.count;
    projectCounts.total += s.count;
  });

  // Calculate active projects (ongoing + planning + completed)
  const activeProjectsCount = await Project.countDocuments({
    projectStatus: { $in: ['ongoing', 'completed', 'planning'] },
  });

  // Build monthly trend series (12 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const trendMap = {};
  monthlyTrendAgg.forEach((m) => {
    trendMap[m._id] = m.count;
  });

  const monthlyTrend = monthNames.map((month, idx) => {
    const monthNum = idx + 1;
    return {
      month,
      monthNum,
      count: trendMap[monthNum] || 0,
    };
  });

  // Format project categories for donut
  const categoryCounts = {};
  projectsByCategoryAgg.forEach((c) => {
    categoryCounts[c._id] = c.count;
  });

  // Format project status for donut
  const statusCounts = {};
  projectsByStatusAgg.forEach((st) => {
    statusCounts[st._id] = st.count;
  });

  res.json({
    success: true,
    data: {
      enquiries: enquiryCounts,
      projects: projectCounts,
      activeProjects: activeProjectsCount || projectCounts.total,
      upcomingAppointments: appointmentCount,
      services: serviceCount,
      gallery: galleryCount,
      testimonials: testimonialCount,
      subscribers: subscriberCount,
      recentEnquiries,
      recentProjects,
      projectsByCategory: categoryCounts,
      projectsByStatus: statusCounts,
      monthlyTrend,
    },
  });
});

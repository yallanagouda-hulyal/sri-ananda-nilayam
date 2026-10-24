const express = require('express');
const router = express.Router();
const { protect, superAdminOnly } = require('../middleware/auth');
const { upload, setUploadFolder } = require('../middleware/upload');

const dashboard = require('../controllers/dashboardController');
const enquiry = require('../controllers/enquiryController');
const service = require('../controllers/serviceController');
const project = require('../controllers/projectController');
const gallery = require('../controllers/galleryController');
const testimonial = require('../controllers/testimonialController');
const settings = require('../controllers/settingsController');
const user = require('../controllers/userController');
const newsletter = require('../controllers/newsletterController');
const appointment = require('../controllers/appointmentController');

// All admin routes require authentication
router.use(protect);

// Dashboard
router.get('/dashboard', dashboard.getDashboardStats);

// Enquiries
router.get('/enquiries', enquiry.getEnquiries);
router.get('/enquiries/export', enquiry.exportEnquiries);
router.get('/enquiries/:id', enquiry.getEnquiryById);
router.patch('/enquiries/:id/status', enquiry.updateEnquiryStatus);
router.post('/enquiries/:id/notes', enquiry.addNote);
router.delete('/enquiries/:id', superAdminOnly, enquiry.deleteEnquiry);

// Services
router.get('/services', service.getServices);
router.get('/services/:id', service.getServiceById);
router.post('/services', setUploadFolder('services'), upload.single('coverImage'), service.createService);
router.put('/services/:id', setUploadFolder('services'), upload.single('coverImage'), service.updateService);
router.delete('/services/:id', superAdminOnly, service.deleteService);

// Projects
router.get('/projects', project.getProjects);
router.get('/projects/:id', project.getProjectById);
router.post('/projects', setUploadFolder('projects'), upload.single('coverImage'), project.createProject);
router.put('/projects/:id', setUploadFolder('projects'), upload.single('coverImage'), project.updateProject);
router.delete('/projects/:id', superAdminOnly, project.deleteProject);

// Gallery
router.get('/gallery', gallery.getImages);
router.post('/gallery', setUploadFolder('gallery'), upload.single('image'), gallery.uploadImage);
router.put('/gallery/reorder', gallery.reorderImages);
router.put('/gallery/:id', gallery.updateImage);
router.delete('/gallery/bulk', gallery.bulkDelete);
router.delete('/gallery/:id', gallery.deleteImage);

// Testimonials
router.get('/testimonials', testimonial.getTestimonials);
router.post('/testimonials', setUploadFolder('testimonials'), upload.single('photo'), testimonial.createTestimonial);
router.put('/testimonials/:id', setUploadFolder('testimonials'), upload.single('photo'), testimonial.updateTestimonial);
router.delete('/testimonials/:id', testimonial.deleteTestimonial);

// Settings & Pages
router.get('/settings', settings.getAllSettings);
router.put('/settings', settings.updateSetting);
router.put('/settings/bulk', settings.bulkUpdateSettings);
router.get('/pages', settings.getPageContent);
router.put('/pages/:slug', settings.updatePageContent);

// Users (super admin only)
router.get('/users', superAdminOnly, user.getUsers);
router.post('/users', superAdminOnly, user.createUser);
router.put('/users/:id', superAdminOnly, user.updateUser);
router.delete('/users/:id', superAdminOnly, user.deleteUser);
router.put('/profile', user.updateProfile);

// Appointments
router.get('/appointments', appointment.getAppointments);
router.post('/appointments', appointment.createAppointment);
router.put('/appointments/:id', appointment.updateAppointment);
router.delete('/appointments/:id', appointment.deleteAppointment);

// Newsletter
router.get('/newsletter', newsletter.getSubscribers);
router.get('/newsletter/export', newsletter.exportSubscribers);
router.delete('/newsletter/:id', newsletter.unsubscribe);

module.exports = router;

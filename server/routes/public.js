const express = require('express');
const router = express.Router();
const pub = require('../controllers/publicController');
const { enquiryLimiter } = require('../middleware/rateLimiter');

router.get('/settings', pub.getSettings);
router.get('/pages/:slug', pub.getPageContent);
router.get('/services', pub.getServices);
router.get('/services/:slug', pub.getServiceBySlug);
router.get('/projects', pub.getProjects);
router.get('/projects/:slug', pub.getProjectBySlug);
router.get('/gallery', pub.getGallery);
router.get('/testimonials', pub.getTestimonials);
router.post('/enquiries', enquiryLimiter, pub.submitEnquiry);
router.post('/newsletter', pub.subscribeNewsletter);

module.exports = router;

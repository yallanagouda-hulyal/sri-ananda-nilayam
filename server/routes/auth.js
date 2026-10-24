const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, auth.login);
router.post('/logout', auth.logout);
router.get('/me', protect, auth.getMe);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password/:token', auth.resetPassword);
router.put('/change-password', protect, auth.changePassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Register new admin
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authenticate, authController.logout);

// Change password
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;

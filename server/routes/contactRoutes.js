const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Public: submit contact form
router.post('/', contactController.createContact);

// Admin: get all contacts
router.get('/', authenticate, isAdmin, contactController.getContacts);

// Admin: delete a contact
router.delete('/:id', authenticate, isAdmin, contactController.deleteContact);

// Admin: reply to contact via email
router.post('/reply', authenticate, isAdmin, contactController.replyToContact);

module.exports = router;

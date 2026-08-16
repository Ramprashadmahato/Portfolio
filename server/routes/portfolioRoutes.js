const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/services', portfolioController.getAllServices);
router.get('/projects', portfolioController.getAllProjects);
router.get('/skills', portfolioController.getAllSkills);
router.get('/hero', portfolioController.getHero);

// Admin routes (Protected)
router.post('/hero', authenticate, isAdmin, portfolioController.updateHero);
router.post('/services', authenticate, isAdmin, portfolioController.createService);
router.put('/services/:id', authenticate, isAdmin, portfolioController.updateService);
router.delete('/services/:id', authenticate, isAdmin, portfolioController.deleteService);

router.post('/projects', authenticate, isAdmin, portfolioController.createProject);
router.put('/projects/:id', authenticate, isAdmin, portfolioController.updateProject);
router.delete('/projects/:id', authenticate, isAdmin, portfolioController.deleteProject);

router.post('/skills', authenticate, isAdmin, portfolioController.createSkill);
router.put('/skills/:id', authenticate, isAdmin, portfolioController.updateSkill);
router.delete('/skills/:id', authenticate, isAdmin, portfolioController.deleteSkill);

module.exports = router;

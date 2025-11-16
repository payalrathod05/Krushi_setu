const express = require('express');
const router = express.Router();

// Import the controller
const farmerController = require('../controllers/farmerController');

// POST routes for authentication
router.post('/register', farmerController.registerFarmer);
router.post('/login', farmerController.loginFarmer);

// POST for applications
router.post('/apply', farmerController.applyForScheme);

// GET routes for applications
router.get('/applications', farmerController.getMyApplications);

// GET routes for schemes (farmer-accessible, no auth needed for browsing)
router.get('/schemes', farmerController.getAllSchemes);
router.get('/schemes/:id', farmerController.getSchemeById);

// GET for notifications (NEW)
router.get('/notifications', farmerController.getMyNotifications);

router.get('/eligible-schemes', farmerController.getEligibleSchemes);  // NEW

module.exports = router;
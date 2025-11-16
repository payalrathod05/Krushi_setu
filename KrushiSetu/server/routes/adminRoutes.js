const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Simple admin auth (header token; replace with JWT later)
const adminAuth = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    if (token !== 'admin-secret-2025') {  // Hardcoded for testing
        return res.status(401).json({ message: "Admin access required." });
    }
    next();
};

// GET all pending applications
router.get('/applications', adminAuth, adminController.getPendingApplications);

// PUT review/update one application
router.put('/applications/:id/review', adminAuth, adminController.reviewApplication);

module.exports = router;
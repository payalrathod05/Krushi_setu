const AdminModel = require('../models/adminModel');

// Get all pending applications
const getPendingApplications = async (req, res) => {
    try {
        const applications = await AdminModel.getPendingApplications();
        res.status(200).json({ applications, count: applications.length });
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications.", error: err.message });
    }
};

// Review and update application status
const reviewApplication = async (req, res) => {
    const { id } = req.params;
    const { status, reviewer_notes } = req.body;

    if (!status || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Status must be 'approved' or 'rejected'." });
    }

    try {
        const app = await AdminModel.findById(id);
        if (!app) {
            return res.status(404).json({ message: "Application not found." });
        }

        if (app.status !== 'pending') {
            return res.status(400).json({ message: "Application already reviewed." });
        }

        const updates = {
            status,
            reviewer_notes
        };

        const success = await AdminModel.updateStatus(id, updates);
        if (!success) {
            return res.status(500).json({ message: "Failed to update application." });
        }

        // Optional: Trigger farmer notification (e.g., "Approved!")
        console.log(`Admin reviewed app ${app.application_id}: ${status}. Notes: ${reviewer_notes || 'None'}`);

        res.status(200).json({ 
            message: `Application ${status} successfully!`, 
            application_id: app.application_id,
            updated_farmer: app.farmer_name 
        });
    } catch (err) {
        res.status(500).json({ message: "Error reviewing application.", error: err.message });
    }
};

module.exports = {
    getPendingApplications,
    reviewApplication
};
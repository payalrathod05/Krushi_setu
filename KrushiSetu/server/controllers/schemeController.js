const SchemeModel = require('../models/schemeModel');

// Controller to handle fetching all schemes
const getAllSchemes = async (req, res) => {
    try {
        const schemes = await SchemeModel.getAll();
        res.status(200).json({ schemes: schemes });
    } catch (err) {
        res.status(500).json({ message: "Error fetching schemes.", error: err.message });
    }
};

module.exports = {
    getAllSchemes
};
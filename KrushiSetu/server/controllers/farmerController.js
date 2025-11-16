const FarmerModel = require('../models/farmerModel');
const SchemeModel = require('../models/schemeModel');
const ApplicationModel = require('../models/applicationModel');
const NotificationModel = require('../models/notificationModel'); // NEW import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerFarmer = async (req, res) => {
    const { name, mobile, aadhaar, password, ...otherDetails } = req.body;

    if (!name || !mobile || !aadhaar || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const farmer_id = `KRS${Math.floor(100000 + Math.random() * 900000)}`;

        const newFarmer = {
            farmer_id,
            name,
            mobile,
            aadhaar,
            password_hash: hashedPassword,
            pm_kisan_id: otherDetails.pm_kisan_id || 'N/A',
            district: otherDetails.district || 'Unknown',
            land_size: otherDetails.land_size || 0,
            income: otherDetails.income || 'Unknown',
            crop_type: otherDetails.crop_type || 'Unknown'
        };

        const result = await FarmerModel.create(newFarmer);
        res.status(201).json({ message: "Farmer registered successfully!", farmerId: result.id, farmer_id });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Mobile number or Aadhaar already exists." });
        }
        res.status(500).json({ message: "Error registering farmer.", error: err.message });
    }
};

const loginFarmer = async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        return res.status(400).json({ message: "Please provide mobile and password." });
    }

    try {
        const farmer = await FarmerModel.findByMobile(mobile);
        if (!farmer) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, farmer.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const payload = {
            id: farmer.id,
            farmer_id: farmer.farmer_id,
            name: farmer.name
        };

        const secretKey = 'your_super_secret_key_for_jwt_123!';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful!",
            token: token,
            farmer: payload
        });

    } catch (err) {
        res.status(500).json({ message: "Server error during login.", error: err.message });
    }
};

const applyForScheme = async (req, res) => {
    const { scheme_id, documents, farmer_id } = req.body;

    if (!scheme_id || !farmer_id) {
        return res.status(400).json({ message: "Please provide scheme_id and farmer_id." });
    }

    try {
        const farmer = await FarmerModel.findByFarmerId(farmer_id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found." });
        }

        const scheme = await SchemeModel.findById(scheme_id);
        if (!scheme || !scheme.is_active) {
            return res.status(404).json({ message: "Scheme not found or inactive." });
        }

        const isEligible = checkEligibility(farmer, scheme);
        if (!isEligible) {
            return res.status(400).json({ message: "Not eligible for this scheme. Check land size, income, or crop type." });
        }

        const application_id = `APP${Date.now()}${Math.floor(Math.random() * 10000)}`;

        const newApplication = {
            application_id,
            farmer_id,
            scheme_id: parseInt(scheme_id),
            status: 'pending',
            applied_at: new Date(),
            documents: documents || null,
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await ApplicationModel.create(newApplication);

        console.log(`Notification: Application ${application_id} submitted for ${scheme.name}`);

        // NEW: Create notification for farmer
        const notificationData = {
            farmer_id: farmer.id,  // Numeric ID for DB
            title: 'Application Submitted',
            message: `Your application for ${scheme.name} has been submitted successfully. Application ID: ${application_id}`,
            type: 'success'
        };
        await NotificationModel.create(notificationData);

        res.status(201).json({
            message: "Application submitted successfully!",
            application_id,
            applicationId: result.id
        });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Application for this scheme already exists." });
        }
        res.status(500).json({ message: "Error submitting application.", error: err.message });
    }
};

const getMyApplications = async (req, res) => {
    const { farmer_id } = req.query;

    if (!farmer_id) {
        return res.status(400).json({ message: "Please provide farmer_id as query param." });
    }

    try {
        const farmer = await FarmerModel.findByFarmerId(farmer_id);  // Validate
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found." });
        }

        const applications = await ApplicationModel.findByFarmerId(farmer_id);
        res.status(200).json({ applications });
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications.", error: err.message });
    }
};
const getAllSchemes = async (req, res) => {
    try {
        const schemes = await SchemeModel.getAll();
        res.status(200).json({ schemes });
    } catch (err) {
        res.status(500).json({ message: "Error fetching schemes.", error: err.message });
    }
};

const getSchemeById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Please provide scheme ID." });
    }

    try {
        const scheme = await SchemeModel.findById(id);
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found." });
        }
        res.status(200).json({ scheme });
    } catch (err) {
        res.status(500).json({ message: "Error fetching scheme.", error: err.message });
    }
};

// NEW: Get farmer's notifications
const getMyNotifications = async (req, res) => {
    const { farmer_id } = req.query;

    if (!farmer_id) {
        return res.status(400).json({ message: "Please provide farmer_id as query param." });
    }

    try {
        const farmer = await FarmerModel.findByFarmerId(farmer_id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found." });
        }

        const notifications = await NotificationModel.findByFarmerId(farmer.id);
        res.status(200).json({ notifications });
    } catch (err) {
        res.status(500).json({ message: "Error fetching notifications.", error: err.message });
    }
};

const checkEligibility = (farmer, scheme) => {
    if (scheme.min_land_size && farmer.land_size < scheme.min_land_size) return false;
    if (scheme.max_land_size && farmer.land_size > scheme.max_land_size) return false;
    if (scheme.income_range && scheme.income_range !== 'all' && !farmer.income.includes(scheme.income_range)) return false;
    if (scheme.crop_types && scheme.crop_types !== 'all' && !scheme.crop_types.includes(farmer.crop_type)) return false;
    return true;
};

// NEW: Get eligible schemes for a farmer
const getEligibleSchemes = async (req, res) => {
    const { farmer_id } = req.query;

    if (!farmer_id) {
        return res.status(400).json({ message: "Please provide farmer_id as query param." });
    }

    try {
        const farmer = await FarmerModel.findByFarmerId(farmer_id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found." });
        }

        const allSchemes = await SchemeModel.getAllFull();  // Full fields for eligibility
        const eligibleSchemes = allSchemes.filter(scheme => checkEligibility(farmer, scheme));

        res.status(200).json({ 
            eligibleSchemes, 
            count: eligibleSchemes.length,
            message: `Found ${eligibleSchemes.length} eligible schemes for ${farmer.name}` 
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching eligible schemes.", error: err.message });
    }
};

module.exports = {
    registerFarmer,
    loginFarmer,
    applyForScheme,
    getMyApplications,
    getAllSchemes,
    getSchemeById,
    getMyNotifications ,
    getEligibleSchemes // NEW export
};
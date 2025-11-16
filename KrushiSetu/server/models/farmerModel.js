// const pool = require('../database');

// /**
//  * Creates a new farmer in the database.
//  * The 'farmer' object should contain: farmer_id, name, mobile, aadhaar, etc.
//  */
// const create = async (farmer) => {
//     // Note the change from Users to farmers and the new column names
//     const sql = `
//         INSERT INTO farmers 
//         (farmer_id, name, mobile, aadhaar, pm_kisan_id, district, land_size, income, crop_type, password_hash) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
    
//     const [result] = await pool.execute(sql, [
//         farmer.farmer_id,
//         farmer.name,
//         farmer.mobile,
//         farmer.aadhaar,
//         farmer.pm_kisan_id,
//         farmer.district,
//         farmer.land_size,
//         farmer.income,
//         farmer.crop_type,
//         farmer.password_hash // Hashed password
//     ]);
    
//     return { id: result.insertId };
// };

// // You will also need functions to find a farmer for login
// const findByMobile = async (mobile) => {
//     const sql = `SELECT * FROM farmers WHERE mobile = ?`;
//     const [rows] = await pool.execute(sql, [mobile]);
//     return rows[0]; // Return the first matching farmer, or undefined
// };

// module.exports = {
//     create,
//     findByMobile
// };

const pool = require('../database');

/**
 * Creates a new farmer in the database.
 * The 'farmer' object should contain: farmer_id, name, mobile, aadhaar, etc.
 */
const create = async (farmer) => {
    // Note the change from Users to farmers and the new column names
    const sql = `
        INSERT INTO farmers 
        (farmer_id, name, mobile, aadhaar, pm_kisan_id, district, land_size, income, crop_type, password_hash) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute(sql, [
        farmer.farmer_id,
        farmer.name,
        farmer.mobile,
        farmer.aadhaar,
        farmer.pm_kisan_id,
        farmer.district,
        farmer.land_size,
        farmer.income,
        farmer.crop_type,
        farmer.password_hash // Hashed password
    ]);
    
    return { id: result.insertId };
};

// You will also need functions to find a farmer for login
const findByMobile = async (mobile) => {
    const sql = `SELECT * FROM farmers WHERE mobile = ?`;
    const [rows] = await pool.execute(sql, [mobile]);
    return rows[0]; // Return the first matching farmer, or undefined
};

// ADD HERE: Find farmer by numeric ID (for internal use, e.g., from JWT)
const findById = async (id) => {
    const sql = `SELECT * FROM farmers WHERE id = ? AND is_active = 1`;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
};

// ADD HERE: Find farmer by farmer_id (string, e.g., 'KRS123456') for applications
const findByFarmerId = async (farmerId) => {
    const sql = `SELECT * FROM farmers WHERE farmer_id = ? AND is_active = 1`;
    const [rows] = await pool.execute(sql, [farmerId]);
    return rows[0] || null;
};

module.exports = {
    create,
    findByMobile,
    // ADD HERE: Export the new functions
    findById,
    findByFarmerId
};
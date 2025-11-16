const pool = require('../database');

// Function to get all active schemes from the database
const getAll = async () => {
    // We select only the most important columns and only where is_active is true
    const sql = `
        SELECT id, name, name_mr, description, category, benefit_amount 
        FROM schemes 
        WHERE is_active = 1
    `;
    const [rows] = await pool.execute(sql);
    return rows;
};

const getAllFull = async () => {
    const sql = `
        SELECT id, name, name_mr, description, category, benefit_amount, 
               min_land_size, max_land_size, income_range, crop_types 
        FROM schemes WHERE is_active = 1
    `;
    const [rows] = await pool.execute(sql);
    return rows;
};
// Function to get a scheme by ID
const findById = async (id) => {
    const sql = `
        SELECT id, name, name_mr, description, description_mr, eligibility, eligibility_mr, 
               documents, documents_mr, benefit_amount, category, min_land_size, 
               max_land_size, income_range, crop_types, is_active
        FROM schemes 
        WHERE id = ? AND is_active = 1
    `;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
};

module.exports = {
    getAll,
    getAllFull,
    findById
};
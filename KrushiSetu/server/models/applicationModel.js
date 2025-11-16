const pool = require('../database');

// Create a new application (fixed with positional placeholders)
const create = async (appData) => {
    const sql = `
        INSERT INTO applications 
        (application_id, farmer_id, scheme_id, status, applied_at, documents, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        appData.application_id,
        appData.farmer_id,
        appData.scheme_id,
        appData.status,
        appData.applied_at,
        appData.documents,
        appData.created_at,
        appData.updated_at
    ]);
    return { id: result.insertId };
};

// Fetch all applications for a specific farmer
const findByFarmerId = async (farmerId) => {
    const sql = `
        SELECT a.*, s.name as scheme_name 
        FROM applications a 
        JOIN schemes s ON a.scheme_id = s.id 
        WHERE a.farmer_id = ? 
        ORDER BY a.applied_at DESC
    `;
    const [rows] = await pool.execute(sql, [farmerId]);
    return rows;
};

module.exports = {
    create,
    findByFarmerId
};
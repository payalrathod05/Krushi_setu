const pool = require('../database');

// List all pending applications (with joins for farmer/scheme details)
const getPendingApplications = async () => {
    const sql = `
        SELECT a.*, f.name as farmer_name, f.mobile, f.district, f.land_size, 
               s.name as scheme_name, s.benefit_amount 
        FROM applications a 
        JOIN farmers f ON a.farmer_id = f.farmer_id 
        JOIN schemes s ON a.scheme_id = s.id 
        WHERE a.status = 'pending' 
        ORDER BY a.applied_at DESC
    `;
    const [rows] = await pool.execute(sql);
    return rows;
};

// Get single application details
const findById = async (id) => {
    const sql = `
        SELECT a.*, f.name as farmer_name, f.mobile, f.district, f.land_size, 
               s.name as scheme_name, s.benefit_amount 
        FROM applications a 
        JOIN farmers f ON a.farmer_id = f.farmer_id 
        JOIN schemes s ON a.scheme_id = s.id 
        WHERE a.id = ?
    `;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
};

// Update application status and notes
const updateStatus = async (id, updates) => {
    let sql = `UPDATE applications SET status = ?, reviewer_notes = ?, reviewed_at = ?, updated_at = ? WHERE id = ?`;
    let params = [updates.status, updates.reviewer_notes || null, new Date(), new Date(), id];
    
    if (updates.status === 'approved') {
        sql = sql.replace('reviewed_at = ?,', 'reviewed_at = ?, approved_at = ?,');
        params.splice(2, 0, new Date());  // Insert approved_at after reviewed_at
    } else if (updates.status === 'rejected') {
        sql = sql.replace('reviewed_at = ?,', 'reviewed_at = ?, rejected_at = ?,');
        params.splice(2, 0, new Date());  // Insert rejected_at
    }
    
    const [result] = await pool.execute(sql, params);
    return result.affectedRows > 0;
};

module.exports = {
    getPendingApplications,
    findById,
    updateStatus
};
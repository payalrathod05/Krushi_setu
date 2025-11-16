const pool = require('../database');

// Create a new notification for a farmer
const create = async (notificationData) => {
    const sql = `
        INSERT INTO notifications (farmer_id, title, message, type, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        notificationData.farmer_id,
        notificationData.title,
        notificationData.message,
        notificationData.type || 'info',
        notificationData.created_at || new Date(),
        notificationData.updated_at || new Date()
    ]);
    return { id: result.insertId };
};

// Fetch all notifications for a specific farmer (unread first)
const findByFarmerId = async (farmerId) => {
    const sql = `
        SELECT * FROM notifications 
        WHERE farmer_id = ? 
        ORDER BY is_read ASC, created_at DESC
    `;
    const [rows] = await pool.execute(sql, [farmerId]);
    return rows;
};

// Mark a notification as read (optional, for future)
const markAsRead = async (id) => {
    const sql = `UPDATE notifications SET is_read = 1, updated_at = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [new Date(), id]);
    return result.affectedRows > 0;
};

module.exports = {
    create,
    findByFarmerId,
    markAsRead
};
// In models/userModel.js
const pool = require('../database');

// SQL Schema: You would run this once directly in MySQL Workbench
/*
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);
*/

// Function to create a new user in the database
const create = async (user) => {
    const sql = `INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)`;
    // The pool.execute method prevents SQL injection
    const [result] = await pool.execute(sql, [user.username, user.email, user.password]);
    return { id: result.insertId };
};

// We don't need an init() function anymore because the table is managed by Workbench.
// We export the create function.
module.exports = {
    create
};
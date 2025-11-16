const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Or your MySQL username
    password: 'Vishal@2002', // Your MySQL password
    database: 'krushisetu_db' // Change this to your new database name
});

module.exports = pool.promise();
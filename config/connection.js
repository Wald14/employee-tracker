const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.\n`)
);

module.exports = db;
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the ${db.databse} database.`)
);

module.exports = db;
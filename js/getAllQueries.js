// Import and require express, inquirer, mysql2, dotenv, and db
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const { printTable } = require('console-table-printer');


async function returnTable(select, from) {
  const promiseDB = db.promise();
  const [rows] = await promiseDB.query(`SELECT ${select} FROM ${from}`);
  return rows;
}


module.exports = { returnTable };
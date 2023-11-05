// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')

// Returns an array of objects based on the SELECT and FROM variables passed through
async function returnTable(select, from, extension) {
  const promiseDB = db.promise();
  const [rows] = await promiseDB.query(`SELECT ${select} FROM ${from} ${extension}`);
  return rows;
}


// Returns an array of all the departments as objects
async function viewAllDepartments() {
  const select = '*'
  const from = 'department'
  const extension = 'ORDER BY name'
  const table = await returnTable(select, from, extension);
  return table
}


// Returns an array of all the roles as objects
async function viewAllRoles() {
  const select = 'role.id, role.title, department.name as department, role.salary '
  const from = 'role'
  const extension = 'INNER JOIN department ON role.department_id = department.id ORDER BY department.name'
  const table = await returnTable(select, from, extension);
  return table
  }


// Returns an array of all the employees as objects
async function viewAllEmployees() {
  const select = 'employee.id, employee.first_name, employee.last_name, role.title, department.name AS      department, role.salary, concat(manager.first_name," ",manager.last_name) as manager_name';
  const from = 'employee employee'
  const extension = 'INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT OUTER  JOIN employee manager ON employee.manager_id = manager.id ORDER BY first_name'
  const table = await returnTable(select, from, extension);
  return table
  }

module.exports = { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees };
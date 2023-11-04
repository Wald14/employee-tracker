// Import and require express, inquirer, mysql2, dotenv, and db
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const { printTable } = require('console-table-printer');


function getAllDepartments() {
  return (db.query(`
    SELECT * FROM department`,
    function (err, results) {
      printTable(results)
      return
    })
  )
}


function getAllRoles() {
  db.query(`
    SELECT role.id, role.title, department.name, role.salary 
    FROM role 
    INNER JOIN department ON role.department_id = department.id`,
    function (err, results) {
      printTable(results)
    })
}

function getAllEmployees() {
  db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name,' ',manager.last_name) as manager_name
    FROM employee employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT OUTER  JOIN employee manager ON employee.manager_id = manager.id `,
    function (err, results) {
      printTable(results)
    })
}

async function returnTable(select, from) {
  const promiseDB = db.promise();
  const [rows] = await promiseDB.query(`SELECT ${select} FROM ${from}`);
  return rows;
}

module.exports = { returnTable };
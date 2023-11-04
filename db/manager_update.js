// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewAll_queries')


// Find all employee
// Find all managers
// Prompt for employee to update
// Update

async function updateManager() {
  // Query for employees managers for manager prompt
  select = 'id as value, concat(first_name," ",last_name) as name'
  from = 'employee'
  const employeeList = await returnTable(select, from)

  // Query for all managers for manager prompt
  select = 'id as value, concat(first_name," ",last_name) as name'
  from = 'employee'
  extension = 'WHERE manager_id is null'
  const managerList = await returnTable(select, from, extension)
  const answer = await inquirer.prompt([
    {
      type: 'list',
      message: 'What employee would you like to update?',
      name: 'pickedEmployee',
      choices: employeeList
    },
    {
      type: 'list',
      message: 'What manager would you like this employee to report to?',
      name: 'pickedManager',
      choices: managerList
    }
  ])
  .then((res) => {
    db.query(`
    UPDATE employee
    SET manager_id = ${res.pickedManager}
    WHERE id = ${res.pickedEmployee};
    `)
    console.log(`\nEmployee manager updated successfully\n`)

  })
}

module.exports = { updateManager };
// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');
const { returnTable } = require('./viewAll_queries')

async function updateRole() {
  // Query for employees for update role prompt
  select = 'id as value, concat(first_name," ",last_name) as name'
  from = 'employee'
  const employeeList = await returnTable(select, from)

  // Query for roles for update role prompt
  select = 'id as value, title as name'
  from = 'role'
  const roleList = await returnTable(select, from)
  const answer = await inquirer.prompt([
    {
      type: 'list',
      message: 'What employee would you like to update their role?',
      name: 'pickedEmployee',
      choices: employeeList
    },
    {
      type: 'list',
      message: 'What role would you like this employee to have?',
      name: 'pickedRole',
      choices: roleList
    }
  ])
  .then((res) => {
    db.query(`
    UPDATE employee
    SET role_id = ${res.pickedRole}
    WHERE id = ${res.pickedEmployee};
    `)
    console.log('\x1b[33m%s\x1b[0m', `\nEmployee role updated successfully\n`)

  })
}

async function updateManager() {
  // Query for employees for manager prompt
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
    console.log('\x1b[33m%s\x1b[0m', `\nEmployee manager updated successfully\n`)

  })
}

module.exports = { updateManager, updateRole };
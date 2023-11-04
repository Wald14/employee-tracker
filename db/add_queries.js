// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewAll_queries')


async function addDepartment() {
  const departmentList = await viewAllDepartments()
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What would you like to call the new Department?',
      name: 'name',
    }
  ])
  .then((res) => {
    const departmentIndex = departmentList.findIndex(departmentList => departmentList.name === res.name)
    if (departmentIndex >= 0) {
      console.log(`\nThe ${res.name} department already exists\n`)
    } else {
       db.query(`INSERT INTO department (name) Values ('${res.name}')`)
       console.log(`\n${res.name} has been added as a new department!\n`)
    }
    return res;
    })
}


module.exports = { addDepartment };
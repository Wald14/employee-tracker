// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewAll_queries')


// Validators for inquirer prompts
const confirmNotNullValidator = async (input) => {
  if (input.length === 0) {
     return 'Please enter at least one character';
  }
  return true;
};


// Add a Department
async function addDepartment() {
  const departmentList = await viewAllDepartments()
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What would you like to call the new Department?',
      name: 'name',
      validate: confirmNotNullValidator
    }
  ])
  .then((res) => {
    // Makes sure the department doesn't already exist
    const newDep = res.name.trim();
    const departmentIndex = departmentList.findIndex(departmentList => departmentList.name.toLowerCase() === newDep.toLowerCase())
    if (departmentIndex >= 0) {
      console.log(`\nThe ${departmentList[departmentIndex].name} department already exists\n`)
    } else {
      // If new, adds new department
       db.query(`INSERT INTO department (name) Values ('${newDep}')`)
       console.log(`\n${newDep} has been added as a new department!\n`)
    }
    return;
    })
}


module.exports = { addDepartment };
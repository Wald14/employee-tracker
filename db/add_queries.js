// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewAll_queries')


// Validators for inquirer prompts
const notNullValidator = async (input) => {
  if (input.length === 0) {
     return 'Please enter at least one character';
  }
  return true;
};

const isNanValidator = async (input) => {
  if (isNaN(input)) {
    return 'Please enter a number';
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
      validate: notNullValidator
    }
  ])
  .then((res) => {
    // Makes sure the department doesn't already exist
    const newDep = res.name.trim();
    const departmentIndex = departmentList.findIndex(departmentList => departmentList.name.toLowerCase() === newDep.toLowerCase())
    if (departmentIndex >= 0) {
      console.log(`\nThe ${departmentList[departmentIndex].name} department already exists. Select View All Departments to see which departments already exist.\n`)
    } else {
      // If new, adds new department
       db.query(`INSERT INTO department (name) Values ('${newDep}')`)
       console.log(`\n${newDep} has been added as a new department!\n`)
    }
    return;
    })
}


// Add a role
async function addRole() {
  // Query for all roles for later validation
  const roleList = await viewAllRoles()
  // Query for all departments for asking which department to add to
  let select = 'id as value, name'
  let from = 'department'
  const departmentList = await returnTable(select, from)

  // Prompt user for info
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole',
      validate: notNullValidator
    },
    {
      type: 'input',
      message: 'What is the salary of this role?',
      name: 'newSalary',
      validate: isNanValidator
    },
    {
      type: 'list',
      message: 'What department would you like to add this role to?',
      name: 'pickedDepartment',
      choices: departmentList
    }
  ])
  .then((answers) => {
    db.query(`
      INSERT INTO role (title, salary, department_id) 
      VALUES ('${answers.newRole}', ${parseInt(answers.newSalary)}, ${answers.pickedDepartment});
      `,
    )
  })
}

module.exports = { addDepartment, addRole };
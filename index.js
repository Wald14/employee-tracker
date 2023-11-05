// Imports for package.json
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const { printTable } = require('console-table-printer');

// Imports from local files
const db = require('./config/connection')
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./utils/viewAll_queries')
const { addDepartment, addRole, addEmployee } = require('./utils/add_queries')
const { updateManager } = require('./utils/manager_update')

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;
// Initialize an instance of Express.js
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Starting user options
const listOfOptions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'optionPicked',
    choices: [
      {
        name: 'View all Departments',
        value: 'viewAllDepartments'
      },
      {
        name: 'View all Roles',
        value: 'viewAllRoles'
      },
      {
        name: 'View all Employees',
        value: 'viewEmployees'
      },
      new inquirer.Separator(),
      {
        name: 'Add a Department',
        value: 'addDepartment'
      },
      {
        name: 'Add a Role',
        value: 'addRole'
      },
      {
        name: 'Add an Employee',
        value: 'addEmployee'
      },
      new inquirer.Separator(),
      {
        name: "Update an Employee's Manager",
        value: 'updateManager'
      },
      new inquirer.Separator(),
      {
        name: 'Quit',
        value: 'quit'
      },
      new inquirer.Separator()
    ]
  }
]


async function start() {
  const answer = await inquirer.prompt(listOfOptions)
  switch (answer.optionPicked) {
    case 'viewAllDepartments':
      const departmentData = await viewAllDepartments()
      printTable(departmentData)
      break;

    case 'viewAllRoles':
      const roleData = await viewAllRoles()
      printTable(roleData)
      break;

    case 'viewEmployees':
      const employeeData = await viewAllEmployees()
      await viewAllEmployees()
      printTable(employeeData)
      break;

    case 'addDepartment':
      // const newDepartment = await addDepartment()
      await addDepartment()
      break;

    case 'addRole':
      // const newRole = await addRole()
      await addRole()
      break;

    case 'addEmployee':
      // const newEmployee = await addEmployee()
      await addEmployee()
      break;

    case 'updateManager':
      // const changeManager = await updateManager()
      await updateManager()
      break;

    case 'quit':
      process.exit()
  }
  start();
}

function displayStartup() {
  // console.log("%c Ｅｍｐｌｏｙｅｅ Ｔｒａｃｋｅｒ\n", "color: #00FF00")
  console.log('\x1b[33m%s\x1b[0m', 
  ' -------------------------------\n Ｅｍｐｌｏｙｅｅ Ｔｒａｃｋｅｒ\n -------------------------------\n')
}

// Display startup (outside start functino so it only displays once)
displayStartup();
start();




/*
BONUS
  - DONE Update employee manager
  - View employees by manager
        - prompt for which manager they'd like to view
        - present a table of that manager's employee's
  - View employees by department
        - prompt for which department they'd like to view
        - present a table of that department's empolyees
  - Delete departments, roles, and employees
  - View the total utilized budge of a department
      + aka the combined salaries of all employees in that department
*/

// Imports
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./config/connection')
const { printTable } = require('console-table-printer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./db/viewAll_queries')
const { addDepartment, addRole, addEmployee } = require('./db/add_queries')

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;
// Initialize an instance of Express.js
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// TODO: Present user with options

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
      {
        name: 'Quit',
        value: 'quit'
      }
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
      printTable(employeeData)
      break;

    case 'addDepartment':
      const newDepartment = await addDepartment()
      break;

    case 'addRole':
      const newRole = await addRole()
      break;

    case 'addEmployee':
      const newEmployee = await addEmployee()
      break;

    case 'quit':
      process.exit()
  }
  start();
}
start();


// DONE: VIEW ALL DEPARTMENTS

// DONE: VIEW ALL ROLES

// DONE:VIEW ALL EMPLOYEES

// DONE: ADD A DEPARTMENT

// DONE: ADD A ROLE
//      TODO: Check if the role already exists in specific department vs just in general

// DONE: Add an employee

// DONE: Quit (ends the program)


/*
BONUS
  - Update employee manager
        - prompt which manager with a list of all employees without a manager
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
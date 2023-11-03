// Import and require express, inquirer, mysql2, dotenv, and db
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./config/connection')
const {printTable} = require('console-table-printer');

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
        value: 'viewDepartments'      
      },
      {
        name: 'View all Roles',
        value: 'viewRoles'      
      },
      {
        name: 'View all Employees',
        value: 'viewEmployees'         
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
  switch(answer.optionPicked){
    case 'viewDepartments':
      getAllDepartments()
      break;
    
    case 'viewRoles':
      getAllRoles()
      break;
    
    case 'viewEmployees':
      getAllEmployees()
      break;
    
    case 'quit':
      process.exit()
  }
}
start();
  
// DONE: VIEW ALL DEPARTMENTS
  // DONE: Run query for the whole department SQL table
function getAllDepartments(){
  db.query(`
    SELECT * FROM department`, 
    function(err, results){
      printTable(results)
      start()
  })
}

// DONE: VIEW ALL ROLES
  // DONE: Run query for the whole role SQL table
function getAllRoles(){
  db.query(`
    SELECT role.id, role.title, department.name, role.salary 
    FROM role 
    INNER JOIN department ON role.department_id = department.id`, 
    function(err, results){
      printTable(results)
      start()
  })
}

// DONE:VIEW ALL EMPLOYEES
  // DONE: Run query for the whole empoyee SQL table
function getAllEmployees(){
  db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name,' ',manager.last_name) as manager_name
    FROM employee employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT OUTER  JOIN employee manager ON employee.manager_id = manager.id `, 
    function(err, results){
      printTable(results)
      start()
  })
}

// TODO: Add a department
  // TODO: Prompt user for department name
  // TODO: Run query for a list of all the department_names
  // TODO: Compare user entry to department_name list to make sure it doesn't already exist
    // TODO: If it does exist, console.log(`${user-entry} is already a department`)
    // TODO: If it doesn't exist, add it to the department database


// TODO: Add a role
  // TODO: Prompt user for role name
    // TODO: Compare user entry to role_name list to make sure it doesn't already exist
    // TODO: If it does exist, console.log(`${user-entry} is already a department`)
    // TODO: If it doesn't exist, continue
  // TODO: Prompt user for salary
  // TODO: Present user with a list of departments to add to
    // TODO: Run query for a list of all the department_names
  //  TODO: assign user input to variables and enter that into SQL table

  // TODO: Add an employee
      // TODO: Prompt user for employee first name
      // TODO: Prompt user for employee last name
      // TODO: Present user with a list of rolls to pick from
          // TODO: Run query for list of all roles
      // TODO: Present user with a list of managers to pick from
          // TODO: Run query for list of all employees who have NULL as their manager
      // TODO: assign user input to variables and enter that into SQL table

  // TODO: Quit (ends the program)


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

// Imports
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./config/connection')
const { printTable } = require('console-table-printer');

const { returnTable, viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./db/viewAll_queries')
const { addDepartment, addRole } = require('./db/add_queries')

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

    case 'quit':
      process.exit()
  }
  start();
}
start();


// DONE: VIEW ALL DEPARTMENTS
//      DONE: Run query for the whole department SQL table

// DONE: VIEW ALL ROLES
//      DONE: Run query for the whole role SQL table

// DONE:VIEW ALL EMPLOYEES
//      DONE: Run query for the whole empoyee SQL table


// DONE: Add a department
//      DONE: Prompt user for department name
//      DONE: Run query for a list of all the department_names
//      DONE: Compare user entry to department list to make sure it doesn't   already exist
//      DONE: If it does exist, let user know and don't add
//      DONE: If it doesn't exist, add it to the department database


// TODO: Add a role
// DONE: Prompt user for role name
// TODO: Compare user entry to role_name list to make sure it doesn't already exist
// TODO: If it does exist, console.log(`${user-entry} is already a department`)
// TODO: If it doesn't exist, continue
// DONE: Prompt user for salary
// DONE: Present user with a list of departments to add to
// DONE: Run query for a list of all the department_names
//  DONE: assign user input to variables and enter that into SQL table
// async function addRole() {
//   let select = 'id as value, name'
//   let from = 'department'
//   const departmentOptions = await returnTable(select, from);

//   inquirer.prompt([
//     {
//       type: 'input',
//       message: 'What role would you like to add?',
//       name: 'newRole',
//     },
//     {
//       type: 'input: number',
//       message: 'What is the salary of this role?',
//       name: 'newSalary',
//     },
//     {
//       type: 'list',
//       message: 'What department would you like to add this role to?',
//       name: 'pickedDepartment',
//       choices: departmentOptions
//     }
//   ])
//   .then((answers) => {
//   console.log(answers)
//   console.log(`title: ${answers.newRole}`)
//   console.log(`salary: ${answers.newSalary}`)
//   console.log(`department_id: ${answers.pickedDepartment}`)
//   db.query(`
//     INSERT INTO role (title, salary, department_id) 
//     VALUES ('${answers.newRole}', ${parseInt(answers.newSalary)}, ${answers.pickedDepartment});
//     `,
//     function (err, res) {
//       console.log(`${answers.newRole} with a salary of ${answers.newSalary} has been added to the ${answers.pickedDepartment} department`)
//       start()
//     })
//   })
// }


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
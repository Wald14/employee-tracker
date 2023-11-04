// Import and require express, inquirer, mysql2, dotenv, and db
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./config/connection')
const { printTable } = require('console-table-printer');

const { returnTable } = require('./js/getAllQueries')

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
    case 'viewDepartments':
      getAllDepartments()
      console.log("DEPARTMENTS")
      return;

    case 'viewRoles':
      getAllRoles()
      return;

    case 'viewEmployees':
      getAllEmployees()
      return;

    case 'addDepartment':
      addDepartment()
      return;

    case 'addRole':
      addRole()
      return;

    case 'quit':
      process.exit()
  }
}
start();

// async function test(){
//   console.log(await returnDepartmentsTable())
// }
// test();

// DONE: VIEW ALL DEPARTMENTS
// DONE: Run query for the whole department SQL table
function getAllDepartments() {
  db.query(`
    SELECT * FROM department`,
    function (err, res) {
      printTable(res)
      start()
    })
}

// DONE: VIEW ALL ROLES
// DONE: Run query for the whole role SQL table
function getAllRoles() {
  db.query(`
    SELECT role.id, role.title, department.name, role.salary 
    FROM role 
    INNER JOIN department ON role.department_id = department.id`,
    function (err, res) {
      printTable(res)
      start()
    })
}

// DONE:VIEW ALL EMPLOYEES
// DONE: Run query for the whole empoyee SQL table
function getAllEmployees() {
  db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name,' ',manager.last_name) as manager_name
    FROM employee employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT OUTER  JOIN employee manager ON employee.manager_id = manager.id `,
    function (err, res) {
      printTable(res)
      start()
    })
}

// TODO: Add a department
// DONE: Prompt user for department name
// TODO: Run query for a list of all the department_names
// TODO: Compare user entry to department_name list to make sure it doesn't already exist
// TODO: If it does exist, console.log(`${user-entry} is already a department`)
// DONE: If it doesn't exist, add it to the department database
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What would you like to call the new Department?',
      name: 'newDepartment',
    }
  ])
    .then((answer) => {
      db.query(`
      INSERT INTO department (name) Values ('${answer.newDepartment}')
    `,
        function (err, res) {
          console.log(`${answer.newDepartment} has been added as a new department`)
          start()
        })
    })
}


// TODO: Add a role
// TODO: Prompt user for role name
// TODO: Compare user entry to role_name list to make sure it doesn't already exist
// TODO: If it does exist, console.log(`${user-entry} is already a department`)
// TODO: If it doesn't exist, continue
// TODO: Prompt user for salary
// TODO: Present user with a list of departments to add to
// TODO: Run query for a list of all the department_names
//  TODO: assign user input to variables and enter that into SQL table
async function addRole() {
  let select = 'id as value, name'
  let from = 'department'
  const departmentOptions = await returnTable(select, from);

  inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole',
    },
    {
      type: 'input: number',
      message: 'What is the salary of this role?',
      name: 'newSalary',
    },
    {
      type: 'list',
      message: 'What department would you like to add this role to?',
      name: 'pickedDepartment',
      choices: departmentOptions
    }
  ])
  .then((answers) => {
  console.log(answers)
  console.log(`title: ${answers.newRole}`)
  console.log(`salary: ${answers.newSalary}`)
  console.log(`department_id: ${answers.pickedDepartment}`)
  db.query(`
    INSERT INTO role (title, salary, department_id) 
    VALUES ('${answers.newRole}', ${parseInt(answers.newSalary)}, ${answers.pickedDepartment});
    `,
    function (err, res) {
      console.log(`${answers.newRole} with a salary of ${answers.newSalary} has been added to the ${answers.pickedDepartment} department`)
      start()
    })
  })
}

// async function addRole() {
//   const answer = await inquirer.prompt([
//     {
//       type: 'input',
//       message: 'What role would you like to add?',
//       name: 'newRole',
//     },
//     {
//       type: 'input',
//       message: 'What is the salary of this role?',
//       name: 'newSalary',
//     },
//   ])
//   let select = 'id as value, name'
//   let from = 'department'
//   const departmentOptions = await returnTable(select, from);
//   // console.log(rows)
//   const pickedDepartment = await inquirer.prompt([
//     {
//       type: 'list',
//       message: 'What department would you like to add this role to?',
//       name: 'pickedDepartment',
//       choices: departmentOptions
//     }
//   ])
//   console.log(`title: ${answer.newRole}`)
//   console.log(`salary: ${answer.newSalary}`)
//   console.log(`department_id: ${pickedDepartment.pickedDepartment}`)
//   db.query(`
//     INSERT INTO role (title, salary, department_id) 
//     VALUES ('${answer.newRole}', ${answer.salary}, ${ pickedDepartment.pickedDepartment});
//     `,
//     function (err, res) {
//       console.log(`${answer.newRole} with a salary of ${answer.newSalary} has been added to the ${pickedDepartment.pickedDepartment} department`)
//       start()
//     })
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
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
    // Clean up responses
    const newDep = res.name.trim();

    // Makes sure the department doesn't already exist
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
  .then((res) => {
    // Clean up responses
    const newRole = res.newRole.trim();
    const newSal = res.newSalary.trim();

    // Grab name of department selected for console.log response
    const departmentName = (departmentList.find(departmentList => departmentList.value === res.pickedDepartment)).name
    console.log(departmentName)

    // Makes sure the role doesn't already exist
    const roleIndex = roleList.findIndex( roleList => roleList.title.toLowerCase() === res.newRole.toLowerCase())
    if (roleIndex >= 0) {
      console.log(`\n${roleList[roleIndex].title} already exists as a role. Select View All Roles to see which roles already exist.\n`)
    } else {
    // If new, adds new role
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.newRole}', ${parseInt(newSal)}, ${res.pickedDepartment});`)

      // Grab name of department selected for console.log response
      const departmentName = (departmentList.find(departmentList => departmentList.value === res.pickedDepartment)).name
      console.log(departmentName)

      // Console log confirmation
      console.log(`\n${newRole} has been added as a new role into the ${departmentName} department with a salary of ${parseInt(newSal)}!\n`)
    }
    return;
  })
}


// Add a employee
async function addEmployee(){
  // Query for all roles for role prompt
  let select = 'id as value, title as name'
  let from = 'role'
  const roleList = await returnTable(select, from)
  // Query for all roles for role prompt
  select = 'id as value, concat(first_name," ",last_name) as name'
  from = 'employee'
  let extension = 'WHERE manager_id is null'
  const managerList = await returnTable(select, from, extension)

  // Prompt user for info
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: notNullValidator
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: notNullValidator
    },
    {
      type: 'list',
      message: "What is the employee's role?",
      name: 'pickedRole',
      choices: roleList
    },
    {
      type: 'list',
      message: "Who is the manager for this employee?",
      name: 'pickedManager',
      choices: managerList
    }
  ])
  .then((res) => {
    console.log(res)
    db.query(`
    INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES ('${res.firstName}', '${res.lastName}', ${res.pickedRole}, ${res.pickedManager});`)
    return;
  })
}







module.exports = { addDepartment, addRole, addEmployee };
// Imports
const mysql = require('mysql2');
require('dotenv').config();
const db = require('../config/connection')
const inquirer = require('inquirer');


// Find all employee
// Find all managers
// Prompt for employee to update
// Update

// async function updateManager() {



//   // Query for all managers for manager prompt
//   select = 'id as value, concat(first_name," ",last_name) as name'
//   from = 'employee'
//   let extension = 'WHERE manager_id is null'
//   const managerList = await returnTable(select, from, extension)



// }
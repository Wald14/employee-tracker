# Employee Tracker

## Description
This command-line application allows a buissness owner to view and manage the departments, roles, and employees in their company.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Acknowledgements](#acknowledgements)
- [Preview](#preview)

  
## Installation
1) Download repository
2) Run 'npm install' in command prompt after downloading
3) Rename the .env.example file to just .env, then enter your mysql password after the equals sign.
4) If wanting to use the starting departments, roles, and employees. Start mysql in the terminal and run 'source ./db/schema.sql' followed by 'source ./db/seeds.sql'.


## Usage
The user can start the applciation from the command line with node index.js. Upon start up, the user is presented with the following list of options, each offering a different service:
- View All Departments (Sorted by Name) = Presents the user with a table of all the department names
- View All Roles (Sorted by Department Name) = Presents the user with a table of all the roles, the department that role belongs to and what the salary is.
- View All Employees (Sorted by first name) = Presents the suer with a table of all of the employees. This includes their first and last name, title, department, salary, and manager's name. If the manager is blank, it means they are a manager.
- Add a Department = User is asked which department they'd like to add. They aren't allowed to add a department with no name OR a department name that already exists. Upon completion, the terminal console logs a confirmation that the department has been added.
- Add a Role = User is asked which role they'd like to add. They can not enter a role that already exists. Then they are asked for the salary of the employee, where they can only enter a number value or it will notify and reprompt the user. Then the user will be presented with a list of departments to add that role to. Upon completion, the terminal console logs a confirmation that the role has been added.
- Add an Employee = User is asked to enter the employee's first name and then their last name. Then they are presented with a list of all the existing roles to pick from. Then they are presented with a list of managers (all employee's that don't have a manager of their own). They have the option to pick "none" if the new employee is a manager. Upon completion, the terminal console logs a confirmation that the employee has been added.
- Update an Employee's Role = User is presented with a list of all employee's to update. After picking the employee to update, then they are presented with the list of all the roles to pick from. Upon completion, the terminal console logs a confirmation that the employee's role has been updated.
- Update an EMployee's  Manager = User is presented with a list of all employee's to update. This includes those that are managers because their role could've changed and they no longer are a manager. After picking the employee to update, then they are presented with the list of all the managers. Upon completion, the terminal console logs a confirmation that the employee's manager has been updated.


## Questions
Questions can be received on the [Github Repository](https://github.com/Wald14/employee-tracker) for this application. Please make a new issue.


## Acknowledgements
- Gary Almes (Professor)
- Ben Martin and Katy Vincent (TA)
- [W3School](https://www.w3schools.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com)

## Preview
A video of the application in use can be accessed [here](). The following images share the application's apperance:

![Image preview of ]()
-- DONE: Create database ("employee_tracker_db")
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- TODO: Create department database with:
  -- id INT PRIMARY KEY
  -- department_name VARCHAR(30)
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- TODO: Create role database with:
  -- id INT PRIMARY KEY
  -- title VARCHAR(30)
  -- salary DECIMAL
  -- department_id INT (FOREIGN KEY)
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- TODO: Create employee database with:
  -- id INT PRIMARY KEY
  -- first_name VARCHAR(30)
  -- last_name VARCHAR(30)
  -- role_id (FOREIGN KEY)
  -- manager_id ('FOREIGN' KEY but is the employee_id of the manager)
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
  FOREIGN KEY (employee_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
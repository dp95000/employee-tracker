DROP DATABASE IF EXISTS EmployeeTrackerDB;
CREATE database EmployeeTrackerDB;

USE EmployeeTrackerDB;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  dept_name VARCHAR(30)
);
CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);

INSERT INTO department (dept_name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering"), ("Management");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Sales Person", 80000, 1);
VALUES ("Accountant", 100000, 2);
VALUES ("Lawyer", 250000, 3), ("Legal Team Lead", 280000, 3);
VALUES ("Jr. Engineer", 75000, 4), ("Software Engineer", 100000, 4), ("Lead Engineer", 130000, 4);
VALUES ("Engineering Manager", 250000, 5), ("Sales Manager", 250000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 5), ("Mike", "Chan", 2, 5), ("Max", "Harly", 4, 5), ("Ashley", "Rodriguez", 6, 5), ("Kevin", "Tupik", 5, 5), ("Malia", "Brown", 7, 5);
VALUES ("Sarah", "Lord", 3, null), ("Tom", "Allen", 3, null);


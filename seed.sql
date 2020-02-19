DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary decimal,
  department_id INTEGER(11),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER(11),
  manager_id INTEGER(11),
  PRIMARY KEY (id)
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
VALUES ("Sarah", "Lord", 3), ("Tom", "Allen", 3);


var mysql = require("mysql");
var inquirer = require("inquirer");

var figlet = require('figlet');
var chalk = require("chalk");
var clear = require("clear");

clear();

console.log(
    chalk.magentaBright(
      figlet.textSync("EMPLOYEE TRACKER", { standardLayout: "full" })
    )
  );

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3000
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "73BuickRegal",
  database: "EmployeeTrackerDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });


// function which prompts the user for what action they should take
function start() {
    
    inquirer
    .prompt({
      name: "chooseAction",
      type: "list",
      message: "Would you like to do? (use arrow keys)",
      choices: ["View all employees", "View all Job Roles", "View All Departments", "Add New Job Role",
      "Add employee", "Remove Employee", "Add Department", "Remove Department", "Update employee role", "Exit"]
    })
    .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.chooseAction === "View all employees") {
            viewAllEmployees();
        }
        else if(answer.chooseAction === "Add employee") {
            addEmployee();
        } 
        else if(answer.chooseAction === "Remove Employee") {
            removeEmployee();
        }
        else if(answer.chooseAction === "View All Departments") {
            viewDepartments();
        } 
        else if(answer.chooseAction === "View all Job Roles") {
            viewRoles();
        } 
        else if(answer.chooseAction === "Add New Job Role") {
            addRole();
        } 
        else if(answer.chooseAction === "Add Department") {
            addDept();
        }
        else if(answer.chooseAction === "Remove Department") {
            removeDept();
        }
        else if(answer.chooseAction === "Update employee role") {
            updateEmployee();
        }
        else {
          connection.end();
        }
      });
}
// END OF MAIN START FUNCTION

// VIEW ALL EMPLOYEES FUNCTION
function viewAllEmployees() {
    console.log("")
    console.log ("All Current Employess");
    console.log("===============================");
    connection.query("SELECT employee.`first_name` , employee.`last_name` , role.`title` FROM employee ,role WHERE role.`department_id` = employee.`role_id`", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                " First Name: " +
                res[i].first_name +
                " || Last Name: " +
                res[i].last_name +
                " || Job Title: " +
                res[i].title 
            );
        }
    });
    start();
}
// END OF VIEW ALL EMPLOYEES FUNCTION

// VIEW ALL DEPARTMENTS FUNCTION
function viewDepartments() {
    connection.query("SELECT * FROM EmployeeTrackerDB.department", function (err, res) {
        if (err) throw err;
        console.log("")
        console.log ("All Departments");
        console.log("===============================");
        for (let i = 0; i < res.length; i++) {
            console.log(
                " id: " +
                res[i].id +
                " || Department: " +
                res[i].dept_name
            );
        }
    });
    start();
}
// END OF VIEW ALL DEPARTMENTS FUNCTION

// REMOVE DEPARMENT FUNCTION
function removeDept() {
    inquirer
    .prompt([
      {
        name: "deptartment",
        type: "input",
        message: "Enter Name of Deparment You Want to Remove"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "DELETE FROM department WHERE ?",
          {
            //first_name: answer.fname,
            dept_name: answer.deptartment
          },
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("Department Deleted successfully!");
            console.log("==============================");
            start();
          }
        );
      });
}
// END OF REMOVE DEPARTMENT FUNCTION

// ADD EMPLOYEE FUNCTION
function addEmployee() {
    console.log("")
    console.log ("Add New Employee");
    console.log("===============================");
    inquirer
    .prompt([
      {
        name: "fname",
        type: "input",
        message: "Enter New Employee First Name"
      },
      {
        name: "lname",
        type: "input",
        message: "Enter New Employee Last Name"
      },
      {
        name: "roleID",
        type: "input",
        message: "Enter Role ID (See List of Current Job Roles)"
      },
      {
        name: "managerID",
        type: "input",
        message: "Enter Manager ID"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.fname,
            last_name: answer.lname,
            role_id: answer.roleID,
            manager_id: answer.managerID
          },
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("New Employee Added successfully!");
            console.log("==============================");
            // re-prompt the user for if they want to do next
            start();
          }
        );
      });
}
// END OF ADD EMPLOYEE FUNCTION

// REMOVE EMPLOYEE FUNCTION
function removeEmployee() {
    console.log("")
    console.log ("Remove Employee");
    console.log("===============================");
    inquirer
    .prompt([
      {
        name: "lname",
        type: "input",
        message: "Enter Last Name of Employee You Want to Remove"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            //first_name: answer.fname,
            last_name: answer.lname
          },
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("Employee Deleted successfully!");
            console.log("==============================");
            start();
          }
        );
      });
}
// END OF REMOVE EMPLOYEE FUNCTION

// ADD JOB ROLE FUNCTION
function addRole() {
    console.log("")
    console.log ("Add New Job Role");
    console.log("===============================");
    inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Enter Job Role Title"
      },
      {
        name: "salary",
        type: "input",
        message: "Enter The Salary For This New Role"
      },
      {
        name: "deptID",
        type: "input",
        message: "Enter Role ID"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.roleTitle,
            salary: answer.salary,
            department_id: answer.deptID,
          },
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("New Role Added successfully!");
            console.log("==============================");
            // re-prompt the user for if they want to do next
            start();
          }
        );
      });
}
// END OF ADD JOB ROLE FUNCTION

// ADD NEW DEPARTMENT FUNCTION
function addDept() {
    console.log("")
    console.log ("Add New Department");
    console.log("===============================");
    inquirer
    .prompt([
      {
        name: "deptTitle",
        type: "input",
        message: "Enter New Deparment Name"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "INSERT INTO department SET ?",
          {
            dept_name: answer.deptTitle,
          },
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("New Department Added successfully!");
            console.log("==============================");
            // re-prompt the user for if they want to do next
            start();
          }
        );
      });
}
// END OF ADD NEW DEPARTMENT FUNCTION

// VIEW ALL DEPARTMENTS FUNCTION
function viewRoles() {
    console.log("");
    console.log ("All Current Job Titles");
    console.log("===============================");
    connection.query("SELECT * FROM EmployeeTrackerDB.role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                " Id: " +
                res[i].id +
                " || Title: " +
                res[i].title +
                " || Salary: " + res[i].salary +
                "|| Department Id: " + res[i].department_id
            );
        }
    });
    start();
}
// END OF VIEW ALL DEPARTMENTS FUNCTION


// UPDATE EMPLOYEE FUNCTION
function updateEmployee() {
    console.log("")
    console.log ("Update Employee Job Roles");
    console.log("===============================");
    inquirer
    .prompt([
      {
        name: "fname",
        type: "input",
        message: "Enter employee's first name"
      },
      {
        name: "lname",
        type: "input",
        message: "Enter employee's last name"
      },
      {
        name: "currentRole",
        type: "input",
        message: "Enter this employee's current job role (See Job Role List)"
      },
      {
        name: "newRole",
        type: "input",
        message: "Enter this employee's new job role (See Job Role List)"
      }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "UPDATE employee SET ? WHERE ? AND ?",
          [
         {
                role_id: parseInt(answer.newRole)
        },
          {
            first_name: answer.fname
          },
          {
            last_name: answer.lname
          }
        ],
          function(err) {
            if (err) throw err;
            console.log("==============================");
            console.log("Employee Updated successfully!");
            console.log("==============================");
            // re-prompt the user for if they want to do next
            start();
          }
        );
      });
}
// END OF UPDATE EMPLOYEE FUNCTION
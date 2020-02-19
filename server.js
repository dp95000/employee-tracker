var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3000
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "73BuickRegal",
  database: "employee_db"
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
      choices: ["View all employees", "View all employees by department", "View all employees by manager",
      "Add employee", "Remove Employee", "Update employee role", "Update Employee manager", "exit"]
    })
    .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.chooseAction === "View all employees") {
          viewAll();
        }
        else if(answer.postOrBid === "View all employees by department") {
            viewAllByDept();
        } else{
          connection.end();
        }
      });
}

function viewAll() {
    connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0
        }
      );
}
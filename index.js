var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

//START
function mainMenu() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update Employee Role",
          ,
          "Quit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, title, department_name department, CONCAT(manager.first_name,' ',manager.last_name) manager, salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`,
            function (err, data) {
              if (err) {
                throw err;
              }
              console.table(data);
              mainMenu();
            }
          );
          break;
        //this case adds an employee to the database
        case "Add Employee":
          inquirer
            .prompt([
              {
                name: "firstName",
                type: "input",
                message:
                  "What is the first name of the employee you'd like to add?",
              },
              {
                name: "lastName",
                type: "input",
                message:
                  "What is the last name of the employee you'd like to add?",
              },
              {
                name: "roleID",
                type: "input",
                message:
                  "What is the ID of their new role? Use numeric role IDs",
              },
            ])
            .then(function (response) {
              connection.query(
                `INSERT INTO employee set ?`,
                {
                  first_name: response.firstName,
                  last_name: response.lastName,
                  role_id: response.roleID,
                },
                function (err, data) {
                  if (err) {
                    throw err;
                  }
                  console.log("New Employee Added!");
                  mainMenu();
                }
              );
            });
          break;

        // this case views all roles
        case "View All Roles":
          connection.query(
            `SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title`,
            function (err, data) {
              if (err) {
                throw err;
              }
              console.table(data);
              mainMenu();
            }
          );
          break;

        // this case adds a role
        case "Add Role":
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "What is the title for this role?",
              },
              {
                name: "salary",
                type: "input",
                message: "What is salary for this role?",
              },
              {
                name: "departmentID",
                type: "input",
                message: "What is the department ID for this role?",
              },
            ])
            .then(function (response) {
              connection.query(
                `INSERT INTO role SET ?`,
                {
                  title: response.title,
                  salary: response.salary,
                  department_id: response.departmentID,
                },
                function (err) {
                  if (err) {
                    throw err;
                  }
                  console.log("New Role Added!");
                  mainMenu();
                }
              );
            });
          break;

        // this case views all departments
        case "View All Departments":
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) {
              throw err;
            }
            console.table(data);
            mainMenu();
          });
          break;

        //this case adds an department
        case "Add Department":
          inquirer
            .prompt([
              {
                name: "name",
                type: "input",
                message:
                  "What is the name of the department you would like to add?",
              },
            ])
            .then(function (response) {
              connection.query(
                "INSERT INTO department SET ?",
                { department_name: response.name },
                function (err, data) {
                  if (err) {
                    throw err;
                  }
                  console.log("Department successfully added!");
                  mainMenu();
                }
              );
            });
          break;

        //this case updates an employee role
        case "Update Employee Role":
          inquirer
            .prompt([
              {
                name: "employeeID",
                type: "input",
                message: "What is their employee ID?",
              },
              {
                name: "newRole",
                type: "input",
                message:
                  "What is the title of their new role? Use numeric role IDs",
              },
            ])
            .then(function (response) {
              connection.query(
                `UPDATE employee SET ? WHERE ?`,
                [{ role_id: response.newRole }, { id: response.employeeID }],
                function (err, data) {
                  if (err) {
                    throw err;
                  }
                  console.log("Employee Role Successfully Updated!");
                  mainMenu();
                }
              );
            });
          break;

        //this case quits the program and ends the connection
        case "Quit":
          connection.end();
          break;
      }
    });
}

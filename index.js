var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

function main() {
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
              main();
            }
          );
          break;
        
        case "Add Employee":
          inquirer
            .prompt([
              {
                name: "firstName",
                type: "input",
                message:
                  "What is the first name the new employee?",
              },
              {
                name: "lastName",
                type: "input",
                message:
                  "What is the last name of the new employee?",
              },
              {
                name: "roleID",
                type: "input",
                message:
                  "What is there ID number?",
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
                  main();
                }
              );
            });
          break;

        case "View All Roles":
          connection.query(
            `SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title`,
            function (err, data) {
              if (err) {
                throw err;
              }
              console.table(data);
              main();
            }
          );
          break;

        case "Add Role":
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "Role title?",
              },
              {
                name: "salary",
                type: "input",
                message: "Salary?",
              },
              {
                name: "departmentID",
                type: "input",
                message: "Department ID?",
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
                  main();
                }
              );
            });
          break;

        case "View All Departments":
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) {
              throw err;
            }
            console.table(data);
            main();
          });
          break;

        case "Add Department":
          inquirer
            .prompt([
              {
                name: "name",
                type: "input",
                message:
                  "What is the name of the department?",
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
                  main();
                }
              );
            });
          break;

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
                  "What is the title of their new role?",
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
                  main();
                }
              );
            });
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

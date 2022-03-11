const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "8utt3rc^p",
    database: "company_db",
  },
  console.log("Connected to company_db sucessful.")
);

// start by asking questions
// view all employees
// inquirer prompt
function init() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "View all Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then(function (answers) {
      switch (answers.choices) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View all Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  db.query(`SELECT * FROM employee`, function (err, results) {
    console.table(results);
  });
  init();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "newFirst",
        message: "Please Enter new employee's first name.",
        type: "input",
      },
      {
        name: "newLast",
        message: "Please Enter new employee's last name.",
        type: "input",
      },
    ])
    .then((answers) => {
      db.query(`SELECT * FROM role`, function (err, results) {
        const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: "roles",
          })
          .then((role) => {
            db.query(
              `SELECT * FROM employee WHERE manager_id is null`,
              function (err, results) {
                const manager = results.map(({ id, last_name }) => ({
                  name: last_name,
                  value: id,
                }));
                inquirer
                  .prompt({
                    type: "list",
                    name: "id",
                    message: "What is the manager's name?",
                    choices: manager,
                  })
                  .then((manager) => {
                    db.query(
                      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
                      [answers.newFirst, answers.newLast, role.id, manager.id],
                      console.log("New employee added successfully!")
                    );
                    init();
                  });
              }
            );
          });
      });
    });
}

function updateEmployeeRole() {
  db.query(`SELECT * FROM employees`, (err, res) => {
    const employees = res.map(({ id, last_name }) => ({
      name: last_name,
      value: id,
    }));

    inquirer
      .prompt({
        name: "id",
        message: "Who's role would you like to update?",
        type: "list",
        choices: employees,
      })
      .then((employee) => {
        db.query(`SELECT * FROM roles`, function (err, res) {
          const roles = res.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt({
              name: "id",
              message: "What is the title of the employee's new role?",
              type: "list",
              choices: roles,
            })
            .then((role) => {
              db.query(
                `UPDATE employee SET role_id = ? WHERE id= ?`,
                [role.id, employee.id],
                function (err, row) {
                  if (err) throw err;
                  console.log("Employee Role updated successfully!");
                }
              );
              db.query(`SELECT * FROM employee`, (err, res) => {
                init();
              });
            });
          if (err) throw err;
        });
      });
    if (err) throw err;
  });
}

function viewAllRoles() {
  db.query(`SELECT * FROM role`, function (err, res) {
    console.table(res);
  });
  init();
}

function viewAllDepartments() {
  db.query(`SELECT * from department`, function (err, results) {
    console.table(results);
  });
  init();
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: departmentAddition,
      message: "Would you like to add a new department?",
    })
    .then(function (answer) {
      db.query(
        `INSERT INTO department SET ?`,
        {
          name: answer.departmentAddition,
        },
        function (err, res) {
          if (err) throw err;
          init();
        }
      );
    });
}

// query database

// different functions for each user choice (do these last)

init();

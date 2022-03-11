const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  console.log(`Connected to company_db`)

  // db.connect((err) => {
  //   if (err) throw err;
  //   init();
  // })
);

// start by asking questions
// view all employees
// inquirer prompt
function init() {
  inquirer.prompt(
    [
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View Managers",
          "View All Roles",
          "View all Departments",
          "Add Department",
          "Quit",
        ],
      },
    ]
      // promise
      .then((answers) => {
        if (answers.questions === "View All Employees") {
          viewAllEmployees();
        }
        // if/else or switch statments based on choices
        else if (answers.questions === "Add Employee") {
          addEmployee();
        } else if (answers.questions === "Update Employee Role") {
          updateEmployeeRole();
        } else if (answers.questions === "View Managers") {
          viewManager();
        } else if (answers.questions === "View All Roles") {
          viewAllRoles();
        } else if (answers.questions === "View All Departments") {
          viewAllDepartments();
        } else if (answers.questions === "Add Department") {
          addDepartment();
        } else if (answers.questions === "Quit") {
          connection.end();
        }
      })
  );
}
function viewAllEmployees() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    console.table(res);
  });
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
      db.query(`SELECT * FROM roles`, function (err, results) {
        const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: "role",
          })
          .then((role) => {
            db.query(
              `SELECT * FROM employee WHERE manager is null`,
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
                  .then((employee) => {
                    db.query(
                      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
                      [
                        answers.newFirst,
                        answers.newLast,
                        answers.newRole,
                        answers.hasManager,
                      ]
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
  inquirer
    .prompt({
      name: "updatedRoleId",
      type: "list",
      message: "Which role would you like to assign the employee?",
      choices: selectedEmployee,
    })
    .then(
      db.query(`UPDATE employee SET role_id = ? WHERE employee_id = ?`, [
        updateEmployeeRole,
        employee_id,
      ])
    );
  init();
}

function viewManager() {
  const sql = `SELECT * FROM employee
   manager_id`;
  db.query(sql, (err, res) => {
    console.table(res);
  });
  init();
}

function viewAllRoles() {
  const sql = `SELECT role.id, role.title, department.department_name AS department
  FROM role
  INNER JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, res) => {
    console.table(res);
  });
  init();
}

function viewAllDepartments() {
  const sql = `SELECT * from department`;
  db.query(sql, (err, res) => {
    console.table(res);
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

function Quit() {
  const sql = `SELECT * from departments`;
  db.query(sql, (err, res) => {
    console.table(res);
  });
}

// query database

// different functions for each user choice (do these last)

init();

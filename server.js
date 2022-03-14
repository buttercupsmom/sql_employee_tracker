const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "8utt3rc^p",
    database: "company_db",
  },
  console.log("Connected to company_db sucessful.")
);

dunderMifflin();

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
          quit();
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
      db.query("SELECT * FROM role", function (err, results) {
        const role = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: role,
          })
          .then((role) => {
            db.query(
              "SELECT * FROM employee WHERE manager_id is null",
              function (err, results) {
                const managers = results.map(({ id, last_name }) => ({
                  name: last_name,
                  value: id,
                }));
                inquirer
                  .prompt({
                    type: "list",
                    name: "id",
                    message: "What is the manager's name?",
                    choices: managers,
                  })
                  .then((manager) => {
                    db.query(
                      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
                      [answers.newFirst, answers.newLast, role.id, manager.id]
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
  db.query(`SELECT * FROM employee`, (err, results) => {
    const employees = results.map(({ id, last_name }) => ({
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
        db.query(`SELECT * FROM role`, function (err, results) {
          const roles = results.map(({ id, title }) => ({
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
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                [role.id, employee.id],
                function (err, row) {
                  if (err) throw err;
                }
              );
              db.query(`SELECT * FROM employee`, (err, results) => {
                console.table(results);
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
      name: "addDept",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
      db.query("INSERT INTO department (department_name) VALUES (?)", [
        answer.addDept,
      ]);
      init();
    });
}

function quit() {
  process.exit(
    console.log(
      "Thanks for choosing Dunder Mifflin, where all your paper needs are met!"
    )
  );
}

function dunderMifflin() {
  console.log(`                                                                                                                                              
                                                                                                                                              
  DDDDDDDDDDDDD       UUUUUUUU     UUUUUUUUNNNNNNNN        NNNNNNNNDDDDDDDDDDDDD      EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR                   
  D::::::::::::DDD    U::::::U     U::::::UN:::::::N       N::::::ND::::::::::::DDD   E::::::::::::::::::::ER::::::::::::::::R                  
  D:::::::::::::::DD  U::::::U     U::::::UN::::::::N      N::::::ND:::::::::::::::DD E::::::::::::::::::::ER::::::RRRRRR:::::R                 
  DDD:::::DDDDD:::::D UU:::::U     U:::::UUN:::::::::N     N::::::NDDD:::::DDDDD:::::DEE::::::EEEEEEEEE::::ERR:::::R     R:::::R                
    D:::::D    D:::::D U:::::U     U:::::U N::::::::::N    N::::::N  D:::::D    D:::::D E:::::E       EEEEEE  R::::R     R:::::R                
    D:::::D     D:::::DU:::::D     D:::::U N:::::::::::N   N::::::N  D:::::D     D:::::DE:::::E               R::::R     R:::::R                
    D:::::D     D:::::DU:::::D     D:::::U N:::::::N::::N  N::::::N  D:::::D     D:::::DE::::::EEEEEEEEEE     R::::RRRRRR:::::R                 
    D:::::D     D:::::DU:::::D     D:::::U N::::::N N::::N N::::::N  D:::::D     D:::::DE:::::::::::::::E     R:::::::::::::RR                  
    D:::::D     D:::::DU:::::D     D:::::U N::::::N  N::::N:::::::N  D:::::D     D:::::DE:::::::::::::::E     R::::RRRRRR:::::R                 
    D:::::D     D:::::DU:::::D     D:::::U N::::::N   N:::::::::::N  D:::::D     D:::::DE::::::EEEEEEEEEE     R::::R     R:::::R                
    D:::::D     D:::::DU:::::D     D:::::U N::::::N    N::::::::::N  D:::::D     D:::::DE:::::E               R::::R     R:::::R                
    D:::::D    D:::::D U::::::U   U::::::U N::::::N     N:::::::::N  D:::::D    D:::::D E:::::E       EEEEEE  R::::R     R:::::R                
  DDD:::::DDDDD:::::D  U:::::::UUU:::::::U N::::::N      N::::::::NDDD:::::DDDDD:::::DEE::::::EEEEEEEE:::::ERR:::::R     R:::::R                
  D:::::::::::::::DD    UU:::::::::::::UU  N::::::N       N:::::::ND:::::::::::::::DD E::::::::::::::::::::ER::::::R     R:::::R                
  D::::::::::::DDD        UU:::::::::UU    N::::::N        N::::::ND::::::::::::DDD   E::::::::::::::::::::ER::::::R     R:::::R                
  DDDDDDDDDDDDD             UUUUUUUUU      NNNNNNNN         NNNNNNNDDDDDDDDDDDDD      EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR                
  MMMMMMMM               MMMMMMMMIIIIIIIIIIFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFLLLLLLLLLLL             IIIIIIIIIINNNNNNNN        NNNNNNNN
  M:::::::M             M:::::::MI::::::::IF::::::::::::::::::::F::::::::::::::::::::FL:::::::::L             I::::::::IN:::::::N       N::::::N
  M::::::::M           M::::::::MI::::::::IF::::::::::::::::::::F::::::::::::::::::::FL:::::::::L             I::::::::IN::::::::N      N::::::N
  M:::::::::M         M:::::::::MII::::::IIFF::::::FFFFFFFFF::::FF::::::FFFFFFFFF::::FLL:::::::LL             II::::::IIN:::::::::N     N::::::N
  M::::::::::M       M::::::::::M  I::::I    F:::::F       FFFFFF F:::::F       FFFFFF  L:::::L                 I::::I  N::::::::::N    N::::::N
  M:::::::::::M     M:::::::::::M  I::::I    F:::::F              F:::::F               L:::::L                 I::::I  N:::::::::::N   N::::::N
  M:::::::M::::M   M::::M:::::::M  I::::I    F::::::FFFFFFFFFF    F::::::FFFFFFFFFF     L:::::L                 I::::I  N:::::::N::::N  N::::::N
  M::::::M M::::M M::::M M::::::M  I::::I    F:::::::::::::::F    F:::::::::::::::F     L:::::L                 I::::I  N::::::N N::::N N::::::N
  M::::::M  M::::M::::M  M::::::M  I::::I    F:::::::::::::::F    F:::::::::::::::F     L:::::L                 I::::I  N::::::N  N::::N:::::::N
  M::::::M   M:::::::M   M::::::M  I::::I    F::::::FFFFFFFFFF    F::::::FFFFFFFFFF     L:::::L                 I::::I  N::::::N   N:::::::::::N
  M::::::M    M:::::M    M::::::M  I::::I    F:::::F              F:::::F               L:::::L                 I::::I  N::::::N    N::::::::::N
  M::::::M     MMMMM     M::::::M  I::::I    F:::::F              F:::::F               L:::::L         LLLLLL  I::::I  N::::::N     N:::::::::N
  M::::::M               M::::::MII::::::IIFF:::::::FF          FF:::::::FF           LL:::::::LLLLLLLLL:::::LII::::::IIN::::::N      N::::::::N
  M::::::M               M::::::MI::::::::IF::::::::FF          F::::::::FF           L::::::::::::::::::::::LI::::::::IN::::::N       N:::::::N
  M::::::M               M::::::MI::::::::IF::::::::FF          F::::::::FF           L::::::::::::::::::::::LI::::::::IN::::::N        N::::::N
  MMMMMMMM               MMMMMMMMIIIIIIIIIIFFFFFFFFFFF          FFFFFFFFFFF           LLLLLLLLLLLLLLLLLLLLLLLLIIIIIIIIIINNNNNNNN         NNNNNNN
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                `);
  init();
}
// different functions for each user choice (do these last)

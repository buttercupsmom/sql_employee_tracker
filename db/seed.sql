-- department table
INSERT INTO department (department_name)
VALUES ("Managment"),
       ("Sales"),
       ("Accounting"),
       ("Human Resources")
       ("Customer Service")
       ("Administration");
       

-- department role table
INSERT INTO role (role_id, role_title, salary, department_id)
VALUES (000, "Branch Manager", 110000, 1),
(001, "Co-Manager", 100000, 2),
(002, "Salesperson", 80000, 3),
(003, "Head of Accounting", 120000, 4),
(004, "Accountant", 100000, 5),
(005, "Customer Service Specialist", 80000, 6),
(006, "Human Resources Representative", 90000, 7),
(007, "Receptionist", 70000, 8);


-- seed employees that have managers and are managers
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Michael", "Scott", 1, 1),
(2, "Dwight", "Schrute", 2, 2),
(3, "Jim", "Halpert", 2, 3),
(4, "Angela", "Martin",  4, 4),
(5, "Toby", "Flenderson", 6, 5);

-- seed employees that have managers and arent managers
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Pam", "Beesly", 3, 1),
(7, "Kelly", "Kapoor",  6, 1),
(8, "Erin", "Hannon", 8, 1),
(9, "Kevin", "Malone", 5, 4),
(10, "Stanley", "Hudson", 3, 1),
(11, "Oscar", "Martinez", 5, 4),
(12, "Phyllis", "Vance", 3, 1);

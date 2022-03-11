-- department table
INSERT INTO department (department_name)
VALUES ("Managment"),
       ("Sales"),
       ("Accounting"),
       ("Human Resources")
       ("Customer Service")
       ("Administration");
       

-- department role table
INSERT INTO role (role_title, salary, department_id)
VALUES ("Branch Manager", 110000, 1),
("Co-Manager", 100000, 2),
("Salesperson", 80000, 3),
("Head of Accounting", 120000, 4),
("Accountant", 100000, 5)
("Customer Service Specialist", 80000, 6),
("Human Resources Representative", 90000, 7),
("Receptionist", 70000, 8);


-- seed employees that have managers and are managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, 1),
("Dwight", "Schrute", 2, 2),
("Jim", "Halpert", 2, 3),
("Angela", "Martin",  4, 4),
("Toby", "Flenderson", 6, 5);

-- seed employees that have managers and arent managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly", 3, 1),
("Kelly", "Kapoor",  6, 1),
("Erin", "Hannon", 8, 1),
("Kevin", "Malone", 5, 4),
("Stanley", "Hudson", 3, 1),
("Oscar", "Martinez", 5, 4),
("Phyllis", "Vance", 3, 1);

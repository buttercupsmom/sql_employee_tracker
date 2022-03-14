INSERT INTO department (department_name)
VALUES ("Managment"),
       ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Customer Service"),
       ("Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Branch Manager", 110000, 1),
("Co-Manager", 100000, 1),
("Salesperson", 80000, 2),
("Head of Accounting", 120000, 3),
("Accountant", 100000, 3),
("Human Resources Representative", 90000, 4),
("Customer Service Specialist", 80000, 5),
("Receptionist", 70000, 6);


INSERT INTO employee (manager_id, first_name, last_name, role_id)
VALUES (null, "Michael", "Scott", 1),
(null, "Jim", "Halpert", 2),
(null, "Angela", "Martin",  4),
(null, "Toby", "Flenderson", 6),
(1, "Pam", "Beesly", 3),
(2, "Kelly", "Kapoor",  7),
(1, "Erin", "Hannon", 8),
(1, "Stanley", "Hudson", 3);


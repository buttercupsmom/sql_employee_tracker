CREATE DATABASE company_db;

USE company_db


CREATE TABLE department (
    name VARCHAR(30)
);


CREATE TABLE role (
role_id INT,
role_title VARCHAR(30),
role_salary DECIMAL,
department_id INT
);


CREATE TABLE employee (
employee_id INT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);
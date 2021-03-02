USE employeeTracker_db;


INSERT INTO department (department_name) VALUES('Management');
INSERT INTO department (department_name) VALUES('Sales');
INSERT INTO department (department_name) VALUES('HR');
INSERT INTO department (department_name) VALUES('IT');

INSERT INTO role (title, salary, department_id) VALUES('CEO', 100000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES('Sales Rep', 40000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES('Software Developer', 60000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES('Clerk', 25000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Rick', 'Bobby', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lucius', 'Washington', 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Cal', 'Naughton Jr.', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jean', 'Girard', 3, 3);

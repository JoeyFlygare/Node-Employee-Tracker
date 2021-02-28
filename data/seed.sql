USE employeeTracker_db;


INSERT INTO department (department_name) VALUES('Management');
INSERT INTO department (department_name) VALUES('Sales');
INSERT INTO department (department_name) VALUES('Human Resources');
INSERT INTO department (department_name) VALUES('IT');

INSERT INTO role (title, salary, department_id) VALUES('CEO', 100000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES('Sales Represenative', 40000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES('Software Developer', 60000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES('Payroll Clerk', 25000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Joe', 'Harris', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Phil', 'Jurrasic', 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Morgan', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Glen', 'Alexander', 3, 3);

USE employeeTrackerDB;

INSERT INTO department (id, name)
VALUES (100, "Design"), 
    (200, "Account Management"), 
    (300, "Project Management"), 
    (400,"Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (101, "Design Director", 115000, 100), 
    (102, "Senior Designer", 100000, 100), 
    (103, "Designer", 80000, 100),
    (201, "Account Director", 100000, 200),
    (202, "Account Manager", 68000, 200),
    (301, "Operations Manager", 115000, 300),
    (302, "Project Manager", 70000, 300),
    (401, "Sales Director", 150000, 400),
    (402, "Senior Sales Associate", 120000, 400),
    (403, "Sales", 90000, 400);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Matt", "Beck", 101, null), 
    (2, "David", "McClaren", 102, 1), 
    (3, "Daniella", "Torro", 103, 1), 
    (4, "Shon", "Welch", 201, null),
    (5, "Ashley", "Muntean", 202, 4),
    (6, "Todd", "Miller", 301, null),
    (7, "Matt", "Peterson", 302, 6),
    (8, "Heidi", "Leon", 401, null),
    (9, "Stacey", "Beville", 402, 8),
    (10, "Alyson", "Coleman", 403, 8);

USE employeeTrackerDB;

INSERT INTO department (name)
VALUES ("Design"), 
    ("Account Management"), 
    ("Project Management"), 
    ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Design Director", 115000, 1), 
    ("Senior Designer", 100000, 1), 
    ("Designer", 80000, 1),
    ("Account Director", 100000, 2),
    ("Account Manager", 68000, 2),
    ("Operations Manager", 115000, 3),
    ("Project Manager", 70000, 3),
    ("Sales Director", 150000, 4),
    ("Senior Sales Associate", 120000, 4),
    ("Sales", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Beck", 1, null), 
    ("David", "McClaren", 2, 1), 
    ("Daniella", "Torro", 3, 1), 
    ("Shon", "Welch", 4, null),
    ("Ashley", "Muntean", 5, 4),
    ("Todd", "Miller", 6, null),
    ("Matt", "Peterson", 7, 6),
    ("Heidi", "Leon", 8, null),
    ("Stacey", "Beville", 9, 8),
    ("Alyson", "Coleman", 10, 8);

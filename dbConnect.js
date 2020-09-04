const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "catahoula",

  database: "employeeTrackerDB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Make con.query return a promise to use in async await functions
connection.query = util.promisify(connection.query);

// Constructor class to handle all data query functionality

class dbReader {
  // empty constructor call as this would be added automatically.
  constructor() {
  };

  // Functions to view various elements
  viewAll() {
    let query = "SELECT employee.id, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    return connection.query(query);
  };

  viewByDepartments() {
    let query = "SELECT department.name AS department, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department";
    return connection.query(query);
  };

  viewByManager() {
    let query = "SELECT CONCAT(manager.first_name,' ',manager.last_name) AS manager, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager";
    return connection.query(query);
  };

  viewRoles() {
    let query = "SELECT * FROM role";
    return connection.query(query);
  }

  viewDepartments() {
    let query = "SELECT * FROM department";
    return connection.query(query);
  };

  // Functions to Add elements to tables
  insertNewEmployee(employeeData) {
    return connection.query("INSERT INTO employee SET ?", employeeData);
  };

  insertNewRole(roleData) {
    return connection.query("INSERT INTO role SET ?", roleData);
  };

  insertNewDepartment(departmentData) {
    return connection.query("INSERT INTO department SET ?", departmentData);
  };
  
  // functions to return values for display in inquirer calls
  getRoles() {
    let query = "SELECT id, title FROM role";
    return connection.query(query);
  };

  getManagers() {
    let query = "SELECT DISTINCT manager.id, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    return connection.query(query);
  };

  getDepartments() {
    let query = "SELECT * FROM department";
    return connection.query(query);
  }

  // Functions to delete specific elements
  deleteDepartment(deptID) {
    return connection.query("DELETE FROM department WHERE id = ?", deptID.id);
  };

  deleteEmployee(empdel) {
    return connection.query("DELETE FROM employee WHERE id = ?", empdel.id);
  };

  deleteRole(role) {
    return connection.query("DELETE FROM role WHERE id = ?", role.id);
  };

  // Updated functions
  updateRole(role, id) {
    return connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role, id]);
  };

  updateManager(manager, id) {
    return connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [manager, id]);
  };

  // Quit Function
  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = dbReader;
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

connection.query = util.promisify(connection.query);

// connectDB = query => {
//   connection.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//       throw err;
//     }
//     // console.log("\n");
//     // console.table(res);
//     return res;
//   });
// };

class dbReader {
  constructor() {
  };

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

  insertNewEmployee(employeeData) {
    return connection.query("INSERT INTO employee SET ?", employeeData);
  };

  getRoles() {
    let query = "SELECT id, title FROM role";
    return connection.query(query);
  };

  getManagers() {
    let query = "SELECT DISTINCT manager.id, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    return connection.query(query);
  };

  deleteEmployee(empdel) {
    return connection.query("DELETE FROM employee WHERE id = ?", empdel.id);
  };

  updateRole(role, id) {
    return connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role, id]);
  };

  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = dbReader;
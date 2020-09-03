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

// connect = query => {
//   return new Promise((resolve, reject) => {
//     connection.query(query, (err, res) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       let data = res;
//       return data;
//     });
//   });
// };

connectDB = query => {
  connection.query(query, (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("\n");
    console.table(res);
  });
};

class dbReader {
  constructor() {
  };

  viewAll() {
    let query = "SELECT employee.id, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    return connectDB(query);
  };

  viewDepartments() {
    let query = "SELECT department.name AS department, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
    return connectDB(query);
  };

  getRoles() {
    let query = "SELECT title FROM role";
    let data = connect(query);
    return data;
  };

  viewByManager() {
    let query = "SELECT CONCAT(manager.first_name,' ',manager.last_name) AS manager, employee.id, CONCAT(employee.first_name,' ',employee.last_name) AS name, role.title, department.name AS department, role.salary  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    return connectDB(query);
  };

  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = dbReader;
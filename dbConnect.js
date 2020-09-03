const mysql = require("mysql");
const cTable = require("console.table");

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

connect = query => {
  connection.query(query, (err, res) => {
    if (err) {
      throw err;
    }
    return res;
  });
};

connectView = query => {
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
    connectView(query);
  };

  viewDepartments() {
    let query = "SELECT name FROM department ";
    connectView(query);
  };

  getRoles() {
    let query = "SELECT * FROM role";
    let roles = connect(query);
    return roles;    
  };

  viewRoles() {
    let query = "SELECT * FROM role";
    connectView(query);
  };

  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = dbReader;
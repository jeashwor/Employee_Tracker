const mysql = require("mysql");

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

connectView = query => {
  connection.query(query, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(res);
  })
};

class dbReader {
  constructor() {
  };

  viewAll() {
    let query = "SELECT";
    connectView(query);
  };

  viewDepartments() {
    let query = "SELECT * FROM department";
    connectView(query);
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
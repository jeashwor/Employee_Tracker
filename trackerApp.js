const inquirer = require("inquirer");
const dbReader = require("./dbConnect.js");
const cTable = require("console.table");

const dbLink = new dbReader();

const startChoices = [
    "View all employees",
    "View all employees by department",
    "View all employees by manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee manager",
    "Exit application"
];

async function startQuestion() {
    inquirer.prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: startChoices
    }).then(async answer => {
        switch (answer.startQuestion) {
            case startChoices[0]:
                console.table(await dbLink.viewAll());
                startQuestion();
                break;

            case startChoices[1]:
                console.table(await dbLink.viewByDepartments());
                startQuestion();
                break;

            case startChoices[2]:
                console.table(await dbLink.viewByManager());
                startQuestion();
                break;

            case startChoices[3]:
                newEmployeeQuestions();
                break;

            case startChoices[4]:
                deleteEmployeeQuestions();
                break;

            case startChoices[5]:
                // function here
                break;

            case startChoices[6]:
                // function here
                break;

            case startChoices[7]:
                dbLink.quit();
                break;
        }
    });
};

async function deleteEmployeeQuestions() {
    try {
        const employee = await dbLink.viewAll();
        const employeeChoices = employee.map(({ id, name}) => ({
            name: name,
            value: id
        }));
        const deleteEmployeeID = await inquirer.prompt({
            type: "list",
            name: "id",
            message: "Which employee do you want to delete?",
            choices: employeeChoices
        });
  
        console.log("Employee # " + deleteEmployeeID.id + " has been deleted.");
        dbLink.deleteEmployee(deleteEmployeeID);
    } finally {startQuestion()}
};

async function newEmployeeQuestions() {
    try {
        const roleChoiceDB = await dbLink.getRoles();
        const roleChoice = roleChoiceDB.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        const managerChoiceDB = await dbLink.getManagers();
        const managerChoice = managerChoiceDB.map(({ id, manager }) => ({
            name: manager,
            value: id
        }));

        const employeeData = await inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "Chose a position for the new employee.",
            choices: roleChoice
        },
        {
            type: "list",
            name: "manager_id",
            message: "Chose a manager for the new employee.",
            choices: managerChoice
        }
        ]);
        console.log(employeeData.first_name + " " + employeeData.last_name + " has been added.");
        dbLink.insertNewEmployee(employeeData);
    }
    finally { startQuestion() };
};


startQuestion();

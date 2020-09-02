const inquirer = require("inquirer");
const dbReader = require("/dbConnect.js");

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

const startQuestion = () => {
    inquirer.prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: startChoices
    }).then(answer => {
        console.log(answer);
        switch (answer.startQuestion) {
            case startChoices[0]:
                dbLink.viewAll();
                break;

            case startChoices[1]:
                dbLink.viewDepartments();
                break;

            case startChoices[2]:
                dbLink.viewRoles();
                break;

            case startChoices[3]:
                // function here
                break;

            case startChoices[4]:
                // function here
                break;

            case startChoices[5]:
                // function here
                break;

            case startChoices[6]:
                // function here
                break;

            case startChoices[7]:
                // function here
                break;
        }
    });
};

startQuestion();

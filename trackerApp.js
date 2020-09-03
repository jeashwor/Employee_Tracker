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

const startQuestion = () => {
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
                startQuestion();
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
                dbLink.quit();
                break;
        }
    });
};

async function newEmployeeQuestions() {
    const roleChoiceDB = await dbLink.getRoles();
    const roleChoice = roleChoiceDB.map(({id, title}) => ({
        name: title,
        value: id
    }));

    const managerChoiceDB = await dbLink.getManagers();
    const managerChoice = managerChoiceDB.map(({id, manager}) => ({
        name: manager,
        value: id
    }));

    console.log(roleChoice);
    console.log(managerChoice);
    // const employeeData = await inquirer.prompt([{
    //     type: "input",
    //     name: "first_name",
    //     message: "What is the employee's first name?"
    // },
    // {
    //     type: "input",
    //     name: "last_name",
    //     message: "What is the employee's last name?"
    // },
    // {
    //     type: "list",
    //     name: "role_id",
    //     message: "Chose a position for the new employee.",
    //     choices: roleChoice
    // },
    // {
    //     type: "list",
    //     name: "manager_id",
    //     message: "Chose a manager for the new employee.",
    //     choices: managerChoice
    // }
    // ]).then(() => {console.log(employeeData);
// })
    // dbLink.insertNewEmployee(employeeData.first_name, employeeData.last_name, role_id, manager_id)
}
startQuestion();

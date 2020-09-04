const inquirer = require("inquirer");
const dbReader = require("./dbConnect.js");
const cTable = require("console.table");

// call constructor class to pull in mysql query methods
const dbLink = new dbReader();

// Array to build initial functionality prompts
const startChoices = [
    "View all employees",
    "View all employees sorted by department",
    "View all employees sorted by manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee manager",
    "View role",
    "Add role",
    "Remove role",
    "View department",
    "Add department",
    "Remove department",
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
                updateEmployeeRole();
                break;

            case startChoices[6]:
                updateEmployeeManager();
                break;

            case startChoices[7]:
                console.table(await dbLink.viewRoles());
                startQuestion();
                break;

            case startChoices[8]:
                newRoleQuestions();
                break;

            case startChoices[9]:
                deleteRoleQuestions();
                break;

            case startChoices[10]:
                console.table(await dbLink.viewDepartments());
                startQuestion();
                break;

            case startChoices[11]:
                newDepartmentQuestions();
                break;

            case startChoices[12]:
                deleteDepartmentQuestions();
                break;

            case startChoices[13]:
                dbLink.quit();
                break;
        }
    });
};

async function updateEmployeeRole() {
    try {
        const employee = await dbLink.viewAll();
        const employeeChoices = await employee.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        const roleChoiceDB = await dbLink.getRoles();
        const roleChoices = await roleChoiceDB.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        const updateEmployeeID = await inquirer.prompt([{
            type: "list",
            name: "id",
            message: "Which employee do you want to update?",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "role_id",
            message: "Which role is employee moving into?",
            choices: roleChoices
        }
        ]);

        console.log("Employee has been updated.");
        dbLink.updateRole(updateEmployeeID.role_id, updateEmployeeID.id);

    } finally { startQuestion() };
};

async function updateEmployeeManager() {
    try {
        const employee = await dbLink.viewAll();
        const employeeChoices = await employee.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        const managerChoiceDB = await dbLink.getManagers();
        const managerChoice = await managerChoiceDB.map(({ id, manager }) => ({
            name: manager,
            value: id
        }));

        const updateEmployeeID = await inquirer.prompt([{
            type: "list",
            name: "id",
            message: "Which employee do you want to update?",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the new manager?",
            choices: managerChoice
        }
        ]);

        console.log("Employee has been updated.");
        dbLink.updateManager(updateEmployeeID.manager_id, updateEmployeeID.id);
    } finally { startQuestion() };
};

async function deleteDepartmentQuestions() {
    try {
        const departmentChoiceDB = await dbLink.getDepartments();
        const departmentChoices = await departmentChoiceDB.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        const deleteDepartmentID = await inquirer.prompt({
            type: "list",
            name: "id",
            message: "Which department do you want to delete?",
            choices: departmentChoices
        });

        console.log("Department # " + deleteDepartmentID.id + " has been deleted, along with corresponding roles and employees.");
        dbLink.deleteDepartment(deleteDepartmentID);

    } finally { startQuestion() };
};

async function deleteRoleQuestions() {
    try {
        const roleChoiceDB = await dbLink.getRoles();
        const roleChoice = await roleChoiceDB.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        const deleteRoleID = await inquirer.prompt({
            type: "list",
            name: "id",
            message: "Which employee do you want to delete?",
            choices: roleChoice
        });

        console.log("Role # " + deleteRoleID.id + " has been deleted, along with corresponding employees.");
        dbLink.deleteRole(deleteRoleID);

    } finally { startQuestion() };
};

async function deleteEmployeeQuestions() {
    try {
        const employee = await dbLink.viewAll();
        const employeeChoices = await employee.map(({ id, name }) => ({
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

    } finally { startQuestion() };
};

async function newDepartmentQuestions() {
    try {
        const departmentData = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?"
        });

        console.log(departmentData.name + " has been added.");
        dbLink.insertNewDepartment(departmentData);

    } finally { startQuestion() };
};

async function newRoleQuestions() {
    try {
        const departmentChoiceDB = await dbLink.getDepartments();
        const departmentChoices = await departmentChoiceDB.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        const newRoleID = await inquirer.prompt([{
            type: "list",
            name: "department_id",
            message: "Which department does the new role serve.",
            choices: departmentChoices
        },
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for the new role?"
        }
        ]);

        console.log(newRoleID.title + " has been added.");
        dbLink.insertNewRole(newRoleID);

    } finally { startQuestion() };
};

async function newEmployeeQuestions() {
    try {
        const roleChoiceDB = await dbLink.getRoles();
        const roleChoices = await roleChoiceDB.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        const managerChoiceDB = await dbLink.getManagers();
        const managerChoice = await managerChoiceDB.map(({ id, manager }) => ({
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
            choices: roleChoices
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

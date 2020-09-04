# Employee_Tracker

## Description
![license badge](https://img.shields.io/badge/license-MIT-brightgreen)
  
A command-line based application that allows a business owner to view and manage the departments, roles, and employees in there company.  Allows for storage of important employee data with MySQL that can be modified using a node.js.
  
![screen shot](./assets/mainScrShot.png)

  
## Table of Contents
  
* [Installation](installation-instructions)  
* [Usage](#usage-instructions)  
* [License](#license)  
* [Questions](#questions)

  
## Installation Instructions

* Follow [Link](https://github.com/jeashwor/Employee_Tracker) to application GitHub repository.

* Locate Green "Code" button and select the clipboard to copy repo data.

* ![GitHub Page](./assets/gitHubPageScrShot.png)

* Using your preferred terminal application navigate to your desired location to copy the repository folder using the git clone command along with the info copied from the GitHub page in the above step.

* ![GitHub Clone](./utils/gitHubClone.gif)

*  With in the terminal navigate to the newly cloned folder and if you have MySQL command line application installed on your machine the following command can be used to login in, and then create the created database using the provided schema.sql and seeds.sql files.  Otherwise use your preferred method of communicating with the MySQL database.

```
mysql -u root -p
```
```
source schema.sql
source seeds.sql
```


*  No exit MySQL command line app by typing quit, and then run an npm install command to install necessary modules.

```
npm i
```

* Now you are now ready to run the application!


## Usage Instructions

* Application can be called using your command line from the README_Generator file director using the command:
```
node index.js
```
* Answer questions that follow to generate new README.md file in the newFile folder in this directory. 
    * See gif below description for walk through!


## License

* Application licensed under MIT.  For more information see [license document](./utils/license.md).


## Contributing

Contributions to follow Contributor Covenant.  See below for more information.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/)


## Test

* No test were created in initial programming of application.  Further development will include implementation of TDD principals.  


## Questions

Check out my GitHub page here:  [jeashwor's Page](https://github.com/jeashwor)

If you have additional questions please email me at jeashwor@gmail.com

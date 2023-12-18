# WebdriverIO TypeScript Mocha Framework
This repo uses WebdriverIO and TypeScript. It includes examples of the PageObject pattern and some practical examples for using WebdriverIO

## Getting Started
Install the dependencies by running npm install . All the dependencies mentioned in package.json will be installed in the system.

### Run tests:
To locally run the test , we need to update conf_local.ts . in this inside specs we need to just update test class name . eg specs: [
'TestSrcDestinationConnection.ts'
],
Also in Webstorm we need to edit configuration and need to mention test under npm 

### Key Features
- Page Object Design pattern
- Custome types for web elements
- Parallel execution and Cross browser testing

### Folder Structure 
Inside frontend folder can see below structure
1. src folder has component specific module and class have all associated webelement and action following POM
2. test folder has test class . test are writen using mocha
3. utils folder has generic classes used across framework
4. Webcontrol.ts class has all web/action controls methods implemtation . eg setText, click, waitUntil, clear
5. locator.ts has generic methods implementation of locating webElement eg  findElementByCssSelector, findElementByIDs
6. conf_local.ts :The file name suggests that it might be related to a TypeScript project and could be a configuration file specific to a local development environment.
7. The package.json file is a crucial part of Node.js projects, as it contains metadata about the project and its dependencies. This file is commonly used to manage Node.js packages, scripts, and other project-related details.
8. tsconfig.json file is a configuration file used in TypeScript projects to specify compiler options and other settings


Note : Both the test cases has run successfully

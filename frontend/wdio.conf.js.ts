const TEST_ENV = process.env.TEST_ENVIRONMENT || "debug";
const envFileName = TEST_ENV === "prod" ? "prod.env" : "debug.env";
const dotenv = require("dotenv");
dotenv.config({ path: `./${envFileName}` });

const customCommands = require("./helpers/vrni/getApiData.cjs");

exports.config = {

    runner: "local",

    specs: ["./test/*.ts"],
    suites: {
        sequential: [],
        parallel: []
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            //
            browserName: "chrome",
            acceptInsecureCerts: true
        }
    ],
    logLevel: "error",

    logLevels: {
        webdriver: "error",
        webdriverio: "error",
        "@wdio/mocha-framework": "error",
        chromedriver: "error",
        "@wdio/appium-service": "error",
        "@wdio/cli": "error",
        "@wdio/local-runner": "silent"
    },
    //
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["selenium-standalone"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 1000 * 60 * 5
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     */
    before: function () {
        // Add custom commands to WebdriverIO
        Object.keys(customCommands).forEach(key => {
            browser.addCommand(key, customCommands[key]);
        });
    }
};

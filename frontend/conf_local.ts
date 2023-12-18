import {LoginPage} from "./src/components/Login/LoginPage";

exports.config = {
    specs: [
        'TestSrcDestinationConnection.ts'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
            browserName: "chrome",
            acceptInsecureCerts: true,
            "selenoid:options": {
                enableVideo: false,
                enableVNC: true,
                enableLog: true
            },
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
            "goog:chromeOptions": {
                args: [
                    "--disable-infobars",
                    "--no-sandbox",
                    "--disable-web-security=true",
                    "--ignore-certificate-errors=true",
                    "--disable-browser-side-navigation",
                    "--window-size=1920x1080",
                ],
                prefs: {
                    directory_upgrade: true,
                    prompt_for_download: false,
                    "download.default_directory": "downloads",
                    "intl.accept_languages": "en-US",
                    profile: {
                        content_settings: {
                            exceptions: {
                                clipboard: {
                                    ["*"]: {
                                        expiration: "0",
                                        last_modified: Date.now(),
                                        model: 0,
                                        setting: 1
                                    }
                                }
                            }
                        }
                    },
                },
            },
        },
    ],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://your-app-url.com', // Replace with your application's URL
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 1000 * 60 * 100,
    },

    before: async function (capabilities, specs) {
        let loginObj = new LoginPage();
        return loginObj.login("coreg11734@astegol.com","RudderStack@123");
    },
};

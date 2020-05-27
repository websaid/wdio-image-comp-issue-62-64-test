const { remote } = require("webdriverio");
const WdioImageComparisonService = require('wdio-image-comparison-service').default;

let env = "asd"
main("Test", "ASD")
let testcase = "mainPage"
async function main(testcase, nsc) {
    const browser = await remote({
        "runner": "local",
        "logLevel": "debug",
        "maxInstances": 10,
        "capabilities": {
            "browserName": "chrome",
            'goog:chromeOptions': {
                args: ['--window-size=1020,900'],
            }
        },
        "waitforTimeout": 10000,
        "connectionRetryTimeout": 90000,
        "connectionRetryCount": 3
    });
    let wdioImageComparisonService = new WdioImageComparisonService({
        "savePerInstance": true,
        "clearRuntimeFolder": true,
        "autoSaveBaseline": true,
        "blockOutStatusBar": true,
        "blockOutToolBar": true,
        "disableCSSAnimation": false,
        "fullPageScrollTimeout": 2500,
        "clearFolder": true,
        "formatImageName": `${env.toUpperCase()}_${nsc}_{browserName}_{width}x{height}_${testcase}_{tag}`,
        "screenshotPath": `.tmp/${env.toUpperCase()}/${nsc}`,
    });
    global.browser = browser;
    browser.defaultOptions = wdioImageComparisonService.defaultOptions;
    browser.folders = wdioImageComparisonService.folders
    wdioImageComparisonService.before(browser.capabilities)

    await browser.url("https://saucelabs.com/")

    //Testpart
    await browser.$(".footer-nav").then(async footer => {
        await footer.scrollIntoView()
        await browser.pause(5000)
        let check = await browser.checkScreen("Footer", {
            "fullPageScrollTimeout": 2500,
            "hideScrollBars": true
        })


    })
    await browser.deleteSession()
}
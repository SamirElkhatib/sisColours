/**
 * Created by Samir Elkhatib on 7/17/2017.
 *
 * Connecting to AUBsis using Zombie.js
 * username and password required
 *
 * TODO: find easier access to sis data, or a permanent username/password
 * TODO: Automate sis access periodically
 * TODO: Add more flexibility: What data to download?
 */
var Browser = require('zombie');
var fs = require('fs'); // use only if implementing store to disk functionality
var tableToJson = require('tabletojson');
var browser = new Browser();
module.exports = {
    downloadCourses: function () {
        return new Promise(function (resolve) {
            browser.waitDuration = '250s';
            browser.visit('https://www-banner.aub.edu.lb/pls/weba/twbkwbis.P_WWWLogin', function () {
                console.log(browser.text("title"));
                browser.fill("sid", "201500527");
                browser.fill("PIN", "sisPass--99");
                browser.pressButton("Login");
                browser.wait().then(function () {
                    console.log(browser.text("title"));
                    browser.visit('https://www-banner.aub.edu.lb/pls/weba/bwskfcls.p_sel_crse_search', function () {
                        console.log(browser.text("title"));
                        browser.select("p_term", browser.document.getElementById("term_input_id").children[1].value);
                        browser.pressButton("Submit");
                        browser.wait().then(function () {
                            console.log(browser.text("title"));
                            browser.pressButton("Advanced Search");
                            browser.wait().then(function () {
                                console.log(browser.text("title"));
                                var options = browser.document.getElementById("subj_id").children;
                                // TODO: Obtain full options.length... the /20 parameter was added for faster testing
                                for (var i = 0; i < (options.length); i++) {
                                    options[i].selected = true;
                                }
                                browser.pressButton("SUB_BTN");
                                console.log(browser.text("title"));
                                browser.wait().then(function () {
                                    console.log(browser.text("title"));
                                    var htmlData = browser.document.getElementsByClassName("datadisplaytable")[0].outerHTML;
                                    // writeToDisk(htmlData, "./app/scripts/htmlData.html");
                                    var jsonData = conv(htmlData);
                                    // writeToDisk(JSON.stringify(jsonData), "./app/scripts/jsonData.json");
                                    resolve(jsonData);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
};
// function writes the data to disk
var writeToDisk = function (data, OutputURL) {
    fs.writeFile(OutputURL, data, function (err) {
        if (err)
            throw err;
    });
};

// FIXME: htmlToJson is adding _number, the number represents redundant headers....
// TODO: check htmlToJson from its official source. If the creator merged my suggestion, update the plugin
var conv = function (htmlData) {
    console.log("Converting to JSON...");
    return (tableToJson.convert(htmlData, { countDuplicateHeadings: false })[0]);
};

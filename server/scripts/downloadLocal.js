/**
 * Created by Samir Elkhatib on 7/31/2017.
 *
 * This requests data from MongoDB and downloads it locally.
 * This should be later replaced after switching to the real data source
 *
 */
var fs = require("fs");
var mongo = require("../models/CRUD");
mongo.retrieve("testObjects", function (data) {
    fs.writeFile("mongoData.json", JSON.stringify(data), function (err) {
        if (err)
            throw err;
    });
});

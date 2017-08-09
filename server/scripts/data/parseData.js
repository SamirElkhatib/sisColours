/**
 * Created by Samir Elkhatib on 7/25/2017.
 *
 * Parses downloaded JSON and prepares it for upload on MongoDB
 */
var duration = require('pendel');
module.exports = {
    // Modify the names and values of the JSON data
    parse: function (data) {
        // Stringify the data, easier to work on strings
        var d = JSON.stringify(data);

        // replace the "." with "_" since Mongo doesn't accept "." in index
        d = d.replace(/Inst.Method/g, "Inst_Method");
        return (JSON.parse(d));
    },
    // Transform days and time strings to time array
    getTime: function (days, time) {
        var result = [];
        for (var i = 0; i < days.length; i++) {
            var d = void 0, s = void 0, e = void 0; // day, start, end
            // switch case for each day
            switch (days.charAt(i)) {
                case "M":
                    d = 0;
                    break;
                case "T":
                    d = 1;
                    break;
                case "W":
                    d = 2;
                    break;
                case "R":
                    d = 3;
                    break;
                case "F":
                    d = 4;
                    break;
                case "S":
                    d = 5;
            }
            var start = time.substr(0, 8);
            var end = time.substr(9, 16);
            // return number of minutes that passed since 8:00 am
            // 8:00 am is take here as the reference start of all courses
            s = duration.time('08:00 am', start).totalMinutes;
            e = duration.time('08:00 am', end).totalMinutes;
            result.push([d, s, e]);
        }
        // return an array of number[], each number[] resembles one slot time
        return result;
    }
};

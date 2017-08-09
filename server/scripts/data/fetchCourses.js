/**
 * Created by Samir Elkhatib on 7/25/2017.
 *
 * Main script to require data from AUBsis and store it in database
 */
"use strict";
// FIXME: Decide on real table and database names
// FIXME: Do not import Course and Recitation models, or make them global models (in a separate folder)
// TODO: Fetch courses based on semester name? defined by admin? -> Sometimes fall/spring isn't top of the list


var Course = require("../../models/course.model").Course;
var zombie = require("./zombie");
var parser = require("./parseData");

module.exports = {
  fetch: function () {
    zombie.downloadCourses().then(function (data) {
      Course.remove({}, function (err) {
        var parsed = parser.parse(data);
        createDB(parsed);
        console.log("Done!");
      });
    });
  }
};


// This function reads JSON data and transforms it into objects to be stored in the database
var createDB = function (data) {

  // Defining a loop that pushed courses given an index i
  var pushCourseLoop = function (i) {
    // if CRN = "" => data entry is a Recitation
    if (data[i].CRN == "") {

      // Function finds parent of Recitation recursively
      var findParentCourse = function (j) {
        if (data[j - 1] == "")
          return findParentCourse(j - 1); // Find Recitation's parent course
        else
          return (parseInt(data[j - 1].CRN));
      };
      addRecitation(data[i], findParentCourse(i)); // Add Recitation to parent course
    }
    else {
      addCourse(data[i]);
    }
  };

  // Looping through data[] for all i and applying the loop on data[i]
  for (var i = 0; i < data.length; i++) {
    pushCourseLoop(i);
  }
};

// Fetches data and accounts for special cases, and creates course object in database
var addCourse = function (data) {
  var crn = parseInt(data.CRN);
  var name = (data.Subj + " " + data.Crse);
  var sec = data.Sec;
  var cmp = data.Cmp;
  var cred = data.Cred;
  var title = data.Title;
  var time, cap, act, rem, instructor, location, attribute, date, days, hours;

  // Adjusting if Days is TBA
  if (data.Days == "TBA") {
    time = [];
    cap = data.Time;
    act = data.Cap;
    rem = data.Act;
    instructor = data['XL Rem'];
    location = data['Date (MM/DD)'];
    attribute = data.Location;
    date = data.Instructor;
    days = "TBA";
    hours = "";
  }
  else {
    time = parser.getTime(data.Days, data.Time);
    cap = data.Cap;
    act = data.Act;
    rem = data.Rem;
    instructor = data.Instructor;
    location = data.Location;
    attribute = data.Attribute;
    date = data['Date (MM/DD)'];
    days = data.Days;
    hours = data.Time;
  }
  Course.create({
    crn: crn, name: name, time: time, cap: cap, act: act, rem: rem, instructor: instructor,
    location: location, attribute: attribute, sec: sec, cmp: cmp, cred: cred, title: title,
    date: date, days: days, hours: hours
  });
};

// Adds Recitation to the course's Recitation[] and adds the Recitation time slots to the time[]
var addRecitation = function (data, course) {
  var days, hours, newTimes;

  // Adjusting if Days is TBA
  if (data.Inst_Method == "" && data.Days == "TBA") {
    days = "TBA";
    hours = "";
    newTimes = [];
  }
  else {
    days = data.Inst_Method;
    hours = data.Days;
    newTimes = parser.getTime(data.Inst_Method, data.Days); // newTimes should be array of values
  }
  var instructor = data['XL Rem'];
  var date = data.Instructor;
  var location = data['Date (MM/DD)'];
  Course.findOneAndUpdate({crn: course}, {$pushAll: {time: newTimes}});
  Course.findOneAndUpdate({crn: course}, {$push: {recitations: {days: days, hours: hours,
    instructor: instructor, location: location, date: date}}});
};

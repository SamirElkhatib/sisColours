/**
 * Created by Samir Elkhatib on 8/4/2017.
 *
 * Mongoose modelling for the courses
 */

// TODO: Define correct models connection functionality
var mongoose = require('mongoose');
var config = require('../config');
var dbURL = config.database;

mongoose.connect(dbURL);
var Schema = mongoose.Schema;

// Courses structure
var courseSchema = new Schema({
  crn: Number,
  name: String,
  time: [[Number]],
  cap: Number,
  act: Number,
  rem: Number,
  instructor: String,
  location: String,
  attribute: String,
  sec: Number,
  cmp: String,
  cred: String,
  title: String,
  date: String,
  days: String,
  hours: String,
  recitations:[{
    days: String,
    hours: String,
    instructor: String,
    location: String,
    date: String
  }]
});
var Course = mongoose.model('course', courseSchema);

module.exports = Course;

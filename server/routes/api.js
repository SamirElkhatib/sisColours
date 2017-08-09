/**
 * Created by Samir Elkhatib on 8/4/2017.
 *
 * Includes all the routes that make the server behave as a web api
 */

var express = require('express');
var jwt = require('express-jwt');

var config = require('../config');
var fetchCourses = require('../scripts/data/fetchCourses');
var controller = require('../authentication/controller');

var Course = require('../models/course.model');
var User = require('../models/user.model');

// Authentication middleware
// reference this function in the middle of routes you want to protect
var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

var router = express.Router();
/* GET api listing. */
router.get('/', function (req, res) {
  res.send('api working...');
});

// NOTE: Authentication Routes
router.post('/register', controller.register);
router.post('/login', controller.login);



// FIXME: table name should be a defined constant... maybe a global constant?
// FIXME: Fix all error handling

// get all courses
router.get('/courses', auth, function (req, res) {
  Course.find({}, function(err, data){
    res.status(200).json(data);
  });
});

// fetch all courses to models
router.get('/fetch', auth, function (req, res) {
  fetchCourses.fetch();
});


module.exports = router;

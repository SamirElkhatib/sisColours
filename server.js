/**
 * Created by Samir Elkhatib on 8/3/2017.
 *
 * Application server
 */

// TODO: Make private config file with all models and relevant information

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();

// Authentication Configuration
var passportConfig = require('./server/authentication/passport');
app.use(passport.initialize());

// API routes
var api = require('./server/routes/api');

// Parses POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Main static path at dis
// dist is the folder created with ng build
app.use(express.static(path.join(__dirname, 'dist')));

// API routes at /api
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express.
// Default port used: 3000
var port = process.env.PORT || '3000';
app.set('port', port);

// TODO: Make a separate errors router file
// Catching unauthorized error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
  //TODO: Handle the error with a good looking page
});

var server = http.createServer(app);
server.listen(port, function () {
  console.log("API running on localhost:" + port);
});

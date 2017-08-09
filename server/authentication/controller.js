/**
 * Created by Samir Elkhatib on 8/7/2017.
 *
 * Manages registration and login
 */

var passport = require('passport');
var User = require("../models/user.model");

// TODO: add error handling for the register form
module.exports.register = function (req, res) {
  var user = new User();
  if(!req.body.email){
    res.status(400).json(req.body)
  }else{
    user.email = req.body.email;
    user.name = req.body.name;
    user.schedules = [[]];
    user.setPassword(req.body.password);
    user.save(function (err) {
      // Generate JWT for user upon registering
      var token;
      token = user.generateJWT();
      res.status(200);
      res.json({
        "token": token
      });
    });
  }

};

// Uses passport to login and generates token to user
module.exports.login = function(req, res){
  if (!req.body.email){
    res.status(404).json(req.bo);
  }else{
    passport.authenticate('local', function(err, user, info){
      var token;
      if (err){
        res.status(404).json(err);
        return;
      }

      // Finding user
      if (user){
        token = user.generateJWT();
        res.status(200);
        res.json({
          "token": token
        });
      } else{
        // User not found
        res.status(401).json(info);
      }
    })(req, res);
  }
};


// Checks if account is authorized and grants access or denies it otherwise
module.exports.profileRead = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
        // functions if authorized...
      });
  }

};

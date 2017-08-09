/**
 * Created by Samir Elkhatib on 8/7/2017.
 *
 * Passport for express authentication
 */

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user.model");

passport.use(new LocalStrategy({usernameField: "email"}, function(username, password, resolve){
  User.findOne({email: username}, function (err, user) {
    if (err){return resolve(err);}
    else if (!user){
      // Case user not found in database
      return resolve(null, false, {message: "User not found!"});
    }
    else if (!user.checkPassword(password)){
      // Case wrong password
      return resolve(null, false, {message: "Wrong password"});
    }else{
      return resolve(null, user);
    }
  })
}));

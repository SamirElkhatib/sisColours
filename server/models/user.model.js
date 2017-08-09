/**
 * Created by Samir Elkhatib on 8/7/2017.
 */

var mongoose = require('mongoose');
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var config = require('../config');
var dbURL = config.database;

mongoose.connect(dbURL);
var Schema = mongoose.Schema;

// TODO: Create real user schema
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String,
  salt: String,
  name: {
    type: String,
    unique: true
  },
  schedules: [[Number]]
});

// Methods to hash and check password using crypto built in package
userSchema.methods.setPassword = function (pass) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.checkPassword = function (pass) {
  var hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64, 'sha512').toString('hex');
  return (this.hash === hash);
};

// Generate JWT using secret
userSchema.methods.generateJWT = function () {
  // FIXME: Set a more studied expiry time
  // Setting expiry time
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  // creating JWT
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, config.secret);
};

var User = mongoose.model('user', userSchema);

module.exports = User;

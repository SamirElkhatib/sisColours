/**
 * Created by Samir Elkhatib on 7/17/2017.
 *
 * Controls MongoDB
 * CRUD functions
 * Functions:   MongoExecute: clear - fill - insert
 *              MongoRetrieve
 */
// Start the server with comand:
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "C:\Users\Samir Elkhatib\Desktop\Scryptech\Code\Test\MongoDB"

// FIXME: set models name customizable from admin control....
// TODO: Change from mongodb package to mongoose for better modelling


var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/myproject';
module.exports = {
    // Clears table of specified models
    clear: function (table) {
        MongoClient.connect(dbURL, function (err, db) {
            if (err)
                throw err;
            db.collection(table).deleteMany({}).then(function (result) {
                if (err)
                    throw err;
                db.close();
                return;
            });
        });
    },
    // Fills table of specified models with json values
    fill: function (table, json) {
        MongoClient.connect(dbURL, function (err, db) {
            if (err)
                throw err;
            db.collection(table).insertMany(json, function (err, result) {
                if (err)
                    throw err;
                db.close();
                return;
            });
        });
    },
    // Inserts one value to the table
    insert: function (table, json) {
        MongoClient.connect(dbURL, function (err, db) {
            if (err)
                throw err;
            db.collection(table).insert(json, function (err, result) {
                if (err)
                    throw err;
                db.close();
                return;
            });
        });
    },
    // Updates table with given values
    update: function (table, filter, value) {
        MongoClient.connect(dbURL, function (err, db) {
            if (err)
                throw err;
            db.collection(table).updateOne(filter, value, {}, function (err, result) {
                if (err)
                    throw err;
                db.close();
                return;
            });
        });
    },
    // Returns all values of table
    retrieve: function (table, callback) {
        MongoClient.connect(dbURL, function (err, db) {
            if (err)
                throw err;
            db.collection(table).find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                callback(result);
                db.close();
            });
        });
    }
};

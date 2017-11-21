
// mongoOpenConnection.js
var MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
path = require('path');

require('dotenv').load();

var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
var mongoReadyPromise = new Promise((resolve, reject) => {
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Successfully connected to /%s.", uri);
        resolve(db);
    });
});
module.exports = mongoReadyPromise;


// test.js
var MongoClient = require('mongodb').MongoClient,
mongoReadyPromise = require('./mongoOpenConnection');

mongoReadyPromise.then(db => {
    console.log("my DB: ", db);
});
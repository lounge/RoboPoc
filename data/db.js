'use strict'

var mongo = require('mongodb');

var Db = function Constructor(dbPath) {
  this.dbPath = dbPath;
  this.db = null;

  this._connect();
};

Db.prototype._connect = function() {
  var self = this;
  mongo.MongoClient.connect(this.dbPath, function(err, db) {
    self.db = db;
  });
}

Db.prototype.close = function() {
  var self = this;
  this.db.close(function(err) {
    if (err)
      throw err;
  });
}

Db.prototype.saveStatus = function(user, id, date, msg) {
  var self = this;
  this.db.collection('status').updateOne(
    { 'id': id },
    { $set: { 'user': user, 'date': date, 'msg': msg } },
    { upsert: true },
    function(err, results) {
      console.log(result);
      if (err)
        throw err;
    });
}

Db.prototype.getStatusForUser = function(id, callback) {
  this.db.collection('status')
    .findOne({ 'id': id })
    .then(function(data) {
      if (data !== null) {
        callback(data);
      }
  });
}

Db.prototype.getStatuses = function(callback) {
  this.db.collection('status')
    .find()
    .toArray(function(err, statuses) {
      callback(statuses);
    });
}



module.exports = Db;

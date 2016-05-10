'use strict'

var util = require('util');

var Messages = function Constructor(db) {
  this.db = db;
};

Messages.prototype.statuses = function(callback) {
  var self = this;
  var msg = '';
  this.db.getStatuses(function(statuses) {
    for (var i = 0; i < statuses.length; i++) {
      var row = statuses[i];
      msg += row.user + ': is away ' + row.date + ' message: ' + row.msg + '\n';
    }
    callback(msg);
  });
};

module.exports = Messages;

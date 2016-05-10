'use strict'

var util = require('util');

var Commands = function Constructor(db, messages) {
  this.db = db;
  this.messages = messages;
};

Commands.prototype.saveStatus = function(username, date, msg) {
  this.db.saveStatus(username, userId, date, msg);
}

Commands.prototype.getStatuses = function(callback) {
  console.log('commands');
  this.messages.statuses(callback);
}



module.exports = Commands;

'use strict'

var Bot = require('slackbots');
var util = require('util');
var fs = require('fs');

var Cartman = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'cartman';
  this.channel = this.settings.channelId || 2;
  this.db = this.settings.db;
  this.messages = this.settings.messages;
  this.commands = this.settings.commands;
  this.started = false;
  this.user = null;
};

util.inherits(Cartman, Bot);

Cartman.prototype.run = function() {
  Klagobert.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
  this.on('close', this._onClose);
};

Cartman.prototype._onStart = function() {
  var self = this;
  if (!this.started) {
    this._loadBotUser();
  }
  this.started = true;
};

Cartman.prototype._onClose = function() {
  this.db.close();
  this.started = false;
};

Cartman.prototype._onMessage = function(msg) {
};

Cartman.prototype._loadBotUser = function() {
    this.user = this._findUserByName(this.name);
};

Cartman.prototype._findUserByName = function(username) {
    var self = this;
    var user = this.users.filter(function (user) {
        if (user.name === username) {
          return user;
        }
    })[0];

    return user;
};

Cartman.prototype._findUserById = function(userId) {
    var user = this.users.filter(function (user) {
      if (user.id === userId) {
        return user;
      }
    })[0];

    return user;
};

Cartman.prototype._isChatMessage = function(msg) {
    return msg.type === 'message' && (Boolean(msg.text) || Boolean(msg.message.text));
};

Cartman.prototype._getMessageContent = function(msg) {
    if (Boolean(msg.text)) {
      return msg.text;
    } else if (Boolean(msg.message.text)) {
      return msg.message.text;
    }
};

Cartman.prototype._getMessageUser = function(msg) {
    var userId;
    if (Boolean(msg.user)) {
      userId = msg.user;
    } else if (Boolean(msg.message.user)) {
      userId = msg.message.user;
    }

    return this._findUserById(userId);
};

Cartman.prototype._isChannelConversation = function(msg) {
    return typeof msg.channel === 'string' && msg.channel[0] === 'C';
};

Cartman.prototype._isMentioningCartman = function(msgContent) {
    return msgContent.toUpperCase().indexOf(this.user.id) > -1 || msgContent.toLowerCase().indexOf(this.user.name) > -1;
};

Cartman.prototype._isFromCartman = function (userId) {
    return userId === this.user.id;
};

Cartman.prototype.sendMessage = function(msg) {
  this.postMessageToChannel(this.channels[this.channel].name, msg, { as_user: true });
};

module.exports = Cartman;

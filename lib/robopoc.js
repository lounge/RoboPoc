'use strict'

var Bot = require('slackbots');
var fs = require('fs');

class RoboPoc extends Bot {

  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.settings.name = this.settings.name || 'robopoc';
    this.channelName = this.settings.channelId || 2;
    this.db = this.settings.db;
    this.messages = this.settings.messages;
    this.commands = this.settings.commands;
    this.started = false;
    this.user = null;
    this.currentChannel = null;
  };

  run() {
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
    this.on('close', this._onClose);
  }

  _onStart() {
    var self = this;
    if (!this.started) {
      this._loadBotUser();
      // this.sendMessage('pocipoc');
    }
    this.started = true;
    this.currentChannel = this.getCurrentChannel();
  }

  _onClose() {
    this.db.close();
    this.started = false;
  }

  _onMessage(msg) {
    this._analyzeMessage(msg);
  }

  _loadBotUser() {
    console.log('_loadBotUser: ' + this.settings.name);
      this.user = this._findUserByName(this.settings.name);
  }

  _analyzeMessage(data) {

    var self = this;
    if (this._isChatMessage(data)) {
      var msgContent = this._getMessageContent(data);
      var user = this._getMessageUser(data);
      if (this._isChannelConversation(data) && !this._isFromRoboPoc(user.id)) {
          if (this._isMentioningRoboPoc(msgContent)) {
            this.commands.selectCommand(msgContent, function(reply) {
              self.sendMessages(reply);
            });
          }
        }
      }
  }

  _findUserByName(username) {
      var self = this;
      var user = this.users.filter(function (user) {
          if (user.name === username) {
            return user;
          }
      })[0];

      return user;
  }

  _findUserById(userId) {
      var user = this.users.filter(function (user) {
        if (user.id === userId) {
          return user;
        }
      })[0];

      return user;
  }

  _isChatMessage(msg) {
      return msg.type === 'message' && (Boolean(msg.text) || (Boolean(msg.message) && Boolean(msg.message.text)));
  }

  _getMessageContent(msg) {
      if (Boolean(msg.text)) {
        return msg.text;
      } else if (Boolean(msg.message.text)) {
        return msg.message.text;
      }
  }

  _getMessageUser(msg) {
      var userId;
      if (Boolean(msg.user)) {
        userId = msg.user;
      } else if (Boolean(msg.message.user)) {
        userId = msg.message.user;
      }

      return this._findUserById(userId);
  }

  _isChannelConversation(msg) {
      return typeof msg.channel === 'string' && msg.channel[0] === 'C';
  }

  _isMentioningRoboPoc(msgContent) {
      return msgContent.toUpperCase().indexOf(this.user.id) > -1 || msgContent.toLowerCase().indexOf(this.user.name) > -1;
  }

  _isFromRoboPoc(userId) {
      return userId === this.user.id;
  }

  sendMessage(msg) {
    this.postMessageToChannel(this.currentChannel.name, msg,
      {
        as_user: true
      });
  }

  sendMessages(data) {
    this.postMessageToChannel(this.currentChannel.name, data.title,
      {
        as_user: true,
        attachments: data.messages
      });
  }

  sendErrorMessage(data) {
    this.postMessageToChannel(this.currentChannel.name, data.title,
      {
        as_user: true,
        attachments: [
          {
            'mrkdwn_in': ['text'],
            'color': 'danger',
            'text': data.message
          }]
      });
  }

  sendSuccessMessage(data) {
    this.postMessageToChannel(this.currentChannel.name, data.title,
      {
        as_user: true,
        attachments: [
          {
            'mrkdwn_in': ['text'],
            'color': 'good',
            'text': data.message
          }]
      });
  }

  getCurrentChannel() {
    var self = this;
    console.log('searching for channel: ' + self.channelName);
    var channel = this.channels.filter(function (channel) {
        if (channel.name === self.channelName) {
          console.log('found channel ' + channel.name);
          return channel;
        }
    })[0];

    return channel;
  }
}

module.exports = RoboPoc;

'use strict'

class Commands  {
  constructor(messages, webservices) {
    this.messages = messages;
    this.services = webservices;
    this.messages = messages;
    this.tools = null;
    this.cmds = {
      status: {
        cmd: 'status',
        desc: 'Get build status.',
      }
    }
  }

  selectCommand(msgContent, callback) {
    var self = this;

    if (msgContent.indexOf('/') === -1) {
      this.askCleverBot(callback, msgContent);
    } else {
      var raw = msgContent.split('/')[1]
      var command = raw.split(' ')[0];
      var param1 = raw.split(' ')[1];
      var param2 = raw.split(' ')[2];
      if (command !== undefined) {
        var cmd = command.toLowerCase().trim();
        if (cmd.match('(?:^|\s)(' + this.cmds.status.cmd + ')(?=\s|$)')) {
          this.status(callback);
        } else {
          // TODO: asdf
        }
      }
    }
  }

  status(callback) {
    this.services.getBuildStatus(function(response) {
      var builds = JSON.parse(response);
      messages.buildStatus(builds, function(msg) {
        callback(msg);
      });
    });
  }
}



module.exports = Commands;

'use strict'

var RoboPoc = require('./lib/robopoc');
var Commands = require('./lib/commands');
var Messages = require('./lib/messages');

var bodyParser = require('body-parser');
var express = require('express');
var server = express();

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;
var dbPath = process.env.MONGODB_GOLD_URI;
var channelId = process.env.CHANNEL_ID;
var port =  process.env.PORT || 3000;

var messages = new Messages();
var commands = new Commands(messages);

var robopoc = new RoboPoc({
  channelId: channelId,
  token: token,
  name: name,
  messages: messages,
  commands: commands,
});

var routes = require('./api/routes')(robopoc);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', routes);
server.listen(port);

robopoc.run();

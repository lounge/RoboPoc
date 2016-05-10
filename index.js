'use strict'

var Klagobert = require('./lib/cartman');
var Db = require('./data/db');
var Commands = require('./lib/commands');
var Messages = require('./lib/messages');

var bodyParser = require('body-parser');
var express = require('express');
var server = express();

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;
var dbPath = process.env.MONGODB_URI;
var channelId = process.env.CHANNEL_ID;
var port =  process.env.PORT || 3000;

var db = new Db(dbPath);
var messages = new Messages(db);
var commands = new Commands(db, messages);

var cartman = new Cartman({
  channelId: channelId,
  token: token,
  name: name,
  db: db,
  messages: messages,
  commands: commands,
});

var routes = require('./api/routes')(cartman);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', routes);
server.listen(port);

cartman.run();

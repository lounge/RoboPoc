'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(robopoc) {

  router.get('/test', function(req, res) {
    var username = req.body.user_name;
    var userId = req.body.user_id;
  });

  router.post('/status', function(req, res) {
    try {
      var self = this;
      var username = req.body.user_name;
      var userId = req.body.user_id;
      var text = req.body.text.split(',');
    } catch (err) {
      res.send(err.message);
    }
    //robopoc.sendMessage(msg);
  });

  return router;
}

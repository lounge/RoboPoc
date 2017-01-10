'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(robopoc) {

  router.get('/test', function(req, res) {
    var json = req.body;
  });

  router.post('/', function(req, res, next) {
    res.send({ success: true });
  });

  router.post('/latest', function(req, res, next) {
    res.send({ success: true });
  });

  router.post('/latestFailed', function(req, res) {
    try {
      var build = req.body; //json
      robopoc.sendMessage(build.ProjectName + ' ' + build.LastModifiedBy);
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      robopoc.sendMessage(err.message);
    }
    //robopoc.sendMessage(msg);
  });

  return router;
}

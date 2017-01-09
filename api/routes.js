'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(robopoc) {

  router.get('/test', function(req, res) {
    var json = req.body;
  });

  router.post('/latestFailed', function(req, res) {
    try {
      var build = req.body; //json
      robopoc.sendMessage(build.ProjectName + ' ' + build.LastModifiedBy);
    } catch (err) {
      // res.send(err.message);
      robopoc.sendMessage(err.message);
    }
    //robopoc.sendMessage(msg);
  });

  return router;
}

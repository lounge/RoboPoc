'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(robopoc) {

  router.get('/test', function(req, res) {
    var json = req.body;

  });

  router.post('/', function(req, res, next) {
    console.log('api: /');
    var builds = req.body;

    var successCount = 0;
    var failCount = 0;
    for (var i = 0; i < builds.length; i++) {
      var build = builds[i];
      if (build.Status === 'FAILURE') {
        failCount++;
      } else {
        successCount++;
      }
    }
    robopoc.sendMessages(
      {
        title: '*Build Status*',
        messages: [{ 'title': 'Suceeded', 'text': successCount + ' builds', 'color': 'good'},
                   { 'title': 'Failed', 'text': failCount + ' builds', 'color': 'danger' }]
      });

    // robopoc.sendSuccessMessage(success + ' succesful builds');
    // robopoc.sendErrorMessage(fail + ' failed builds');
    res.send({ success: true });
  });

  router.post('/latest', function(req, res, next) {
    console.log('api: /latest');
    res.send({ success: true });
  });

  router.post('/latestFailed', function(req, res) {
    console.log('api: /latestFailed');
    try {
      var build = req.body; //json
      robopoc.sendErrorMessage({ title: '*' + build.LastModifiedBy + '* broke the build!', message: '[Project]: ' + build.ProjectName });
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      robopoc.sendErrorMessage({ title: '*Something went wrong*', message: err.message });
    }
    //robopoc.sendMessage(msg);
  });

  return router;
}

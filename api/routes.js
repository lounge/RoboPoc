'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(robopoc) {

  router.get('/test', function(req, res) {
    var json = req.body;

  });

  router.post('/', function(req, res, next) {
    var builds = req.body;

    var messages = [];
    var successCount = 0;
    var failCount = 0;

    for (var i = 0; i < builds.length; i++) {
      var build = builds[i];
      if (build.Status === 'FAILURE') {
        failCount++;
        messages.push({
          'color': 'danger',
          'title': 'Broken by ' + build.LastModifiedBy,
          'text':  '[Project] ' + build.ProjectName + '\n' +
                   '[Build step] ' + build.StepName + '\n' +
                   '[Comment] ' + build.Comment + '\n' +
                   '[Date] ' + build.FinishDate + '\n' +
                   '[Log] <' + build.WebUrl + '&tab=buildLog|Build log>'
        });
      } else {
        successCount++;
      }
    }

    messages.push({ 'title': 'Suceeded', 'text': successCount + ' builds', 'color': 'good'});

    robopoc.sendMessages(
      {
        title: '*Build Status*',
        messages: messages
      });

    res.send({ success: true });
  });

  router.post('/latest', function(req, res, next) {
    var build = req.body;
    if (build.Status === 'FAILURE') {
      robopoc.sendErrorMessage(
        {
          title: ':boom:*' + build.LastModifiedBy + '* broke the build!:boom:',
          message: '[Project] ' + build.ProjectName + '\n' +
                   '[Build step] ' + build.StepName + '\n' +
                   '[Comment] ' + build.Comment + '\n' +
                   '[Date] ' + build.FinishDate + '\n' +
                   '[Log] <' + build.WebUrl + '&tab=buildLog|Build log>'

        });
    }
    res.send({ success: true });
  });

  router.post('/latestFailed', function(req, res) {
    try {
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      robopoc.sendErrorMessage({ title: '*Something went wrong*', message: err.message });
    }
  });

  router.post('/failed', function(req, res) {
    try {
      var builds = req.body;
      var messages = [];

      for (var i = 0; i < builds.length; i++) {
        var build = builds[i];
        messages.push({
          'color': 'danger',
          'title': 'Broken by ' + build.LastModifiedBy,
          'text':  '[Project] ' + build.ProjectName + '\n' +
                   '[Build step] ' + build.StepName + '\n' +
                   '[Comment] ' + build.Comment + '\n' +
                   '[Date] ' + build.FinishDate + '\n' +
                   '[Log] <' + build.WebUrl + '&tab=buildLog|Build log>'
        });
      }

      robopoc.sendMessages(
        {
          title: '*Broken builds!* :bomb::boom:',
          messages: messages
        });

      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      robopoc.sendErrorMessage({ title: '*Something went wrong*', message: err.message });
    }
  });

  return router;
}

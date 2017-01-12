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

    var messages = [];
    var successCount = 0;
    var failCount = 0;

    for (var i = 0; i < builds.length; i++) {
      var build = builds[i];
      if (build.Status === 'FAILURE') {
        failCount++;
        messages.push({
          'color': 'danger',
          'title': 'Broken by :boom:' + build.LastModifiedBy + ':boom:',
          'text':  '*[Project]* ' + build.ProjectName + '\n' +
                   '*[Build step]* ' + build.StepName + '\n' +
                   '*[Comment]* ' + build.Comment + '\n' +
                   '*[Date]* ' + build.FinishDate + '\n' +
                   '*[Log]* <' + build.WebUrl + '&tab=buildLog|Build log>'
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
    console.log('api: /latest');
    var build = req.body;

    console.log('id: ' + build.Id);
    console.log('Number: ' + build.Number);
    console.log('Agent: ' + build.Agent);
    console.log('ProjectId: ' + build.ProjectId);
    console.log('ProjectName: ' + build.ProjectName);
    console.log('StepName: ' + build.StepName);
    console.log('Status: ' + build.Status);
    console.log('FinishDate: ' + build.FinishDate);
    console.log('WebUrl: ' + build.WebUrl);
    console.log('Href: ' + build.Href);
    console.log('BuildConfigWebUrl: ' + build.BuildConfigWebUrl);
    console.log('BuildConfigId: ' + build.BuildConfigId);
    console.log('BuildTypeId: ' + build.BuildTypeId);
    console.log('Comment: ' + build.Comment);

    res.send({ success: true });
  });

  router.post('/latestFailed', function(req, res) {
    console.log('api: /latestFailed');
    try {
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      robopoc.sendErrorMessage({ title: '*Something went wrong*', message: err.message });
    }
  });

  router.post('/failed', function(req, res) {
    console.log('api: /failed');
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

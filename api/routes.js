'use strict'

var express = require('express');
var router = express.Router();


module.exports = function(cartman) {

  router.get('/test', function(req, res) {
    var username = req.body.user_name;
    var userId = req.body.user_id;


    res.send('test ' + username + ' ' +  userId);
  });

  router.get('/set-status', function(req, res) {
    try {
      var self = this;
      var username = req.body.user_name;
      var userId = req.body.user_id;
      var text = req.body.text.split(',');
      // var username = req.query.user;
      // var userId = req.query.id;
      // var text = req.query.text.split(',');
      var date = text[0].trim();
      var msg = text[1].trim();
      console.log(date);
      console.log(msg);

      if (date.match('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])')) {
        console.log('correct date');
        cartman.commands.saveStatus(username, userId, date, msg);
      } else {
        console.log('incorrect date');
      }
      //TODO: Regex: (?:\d{4}-\d{2}-\d{2}) (?:\d{4}-\d{2}-\d{2})
    } catch (err) {
      res.send(err.message);
    }


    res.send('Your status has been set.');
  });


  router.post('/where-is', function(req, res) {
    try {
      var self = this;
      var username = req.body.user_name;
      var userId = req.body.user_id;
      var text = req.body.text;

      if (text == null)  {
        console.log('where is all');
        cartman.commands.getStatuses(function(reply) {
          console.log(reply);
          cartman.sendMessage(reply);

        });
      }

    } catch (err) {
      res.send(err.message);
    }


    res.send('where-is everyone.');
  });

  return router;

}

'use strict'

class Messages {
  constructor() {
  };

  buildStatus(builds, callback) {
    var messages = [];
    var successCount = 0;
    var failCount = 0;

    for (var i = 0; i < builds.length; i++) {
      var build = builds[i];
      if (build.Status === 'FAILURE') {
        failCount++;
        messages.push({
          'color': '#9E0000',
          'mrkdwn_in': ['text', 'pretext'],
          'pretext': '*_Broken by - _ '+ build.LastModifiedBy + '*',
          'text':  '*Project:* ' + build.ProjectName + '\n' +
                   '*Build step:* ' + build.StepName + '\n' +
                   '*Comment:* ' + build.Comment + '\n' +
                   '*Date:* ' + build.FinishDateFormat + '\n' +
                   '*Log:* <' + build.WebUrl + '&tab=buildLog|Build log>'
        });
      } else {
        successCount++;
      }
    }

    messages.push({ 'title': 'Suceeded', 'text': successCount + ' builds', 'color': 'good'});

    var msg = {
      title: '*Build Status*',
      messages: messages
    };

    callback(msg);
  }
}

module.exports = Messages;

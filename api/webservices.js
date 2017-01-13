var request = require('request');

module.exports = function() {

	var self = this;
	// this.sockets = null;

	this.apiBaseUrl = 'http://authority-deployer.api/api';

	// this.init = function (websockets) {
	// 	self = this;
	// 	this.sockets = websockets;
	// };

	this.getBuildStatus = function(hollaback) {
    console.log('getBuildStatus');
		request.get({ url: self.apiBaseUrl + '/builds' }, function (err, httpResponse, body) {
      console.log(err);
			if (!err) {
				hollaback(body);
				console.log('Get builds service call successful! Server responded with: ', body);
			} else {
				return console.error('Get builds service call failed: ', err);
			}
		});
	};

}

var _;
_ = require('underscore'); // Optional


var debug = {
	logRequest: function(req) {
		console.log('Request received: ');
		//console.log(req);
		_ && console.dir(_(req).pick('url','method','headers'));
		console.log('Bytes read: '+ req.socket.bytesRead)
	}, 
	logResponse: function(res, firstTime) {
		if (firstTime) {
			console.log('Sending reply: ');
			_ && console.dir(_(res).pick(
				'statusCode','_header','headersSent','domain','_hasBody'
			));
		}
		console.log('Bytes sent: '+ res.socket._bytesDispatched)
	}
};

module.exports = debug;

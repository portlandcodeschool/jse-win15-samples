var _;
_ = require('underscore'); // Optional


var debug = {
	logRequest: function(req) {
		console.log('\nRequest received: ');
		//console.log(req);
		_ && console.dir(_(req).pick('url','method','headers'));
		console.log('Bytes read: '+ req.socket.bytesRead)
	}, 
	logResponse: function(res, firstTime) {
		if (firstTime) {
			console.log('\nSending reply: ');
			_ && console.dir(_(res).pick(
				'statusCode','_header','headersSent','domain','_hasBody'
			));
		}
		console.log('Bytes sent: '+ res.socket._bytesDispatched)
	}
};

module.exports = debug;

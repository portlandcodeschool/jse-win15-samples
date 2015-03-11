var http = require('http');
var fs = require('fs');


var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'image/png'});

	fs.readFile('data/image.png' , function (err, data) {
		//res.writeHead(200, {'Content-Type': 'image/png'}); //optional
		res.write(data);
		res.end();
	});

});

console.log('listening on port 3000');
server.listen(3000);

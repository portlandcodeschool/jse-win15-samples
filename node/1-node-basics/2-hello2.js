
var http = require('http');

var server = http.createServer(function (req, res) {
	// Show some of the request's properties:
  console.log('method = '+req.method);
  console.log('url = ' + req.url);
  console.log('headers = ' + JSON.stringify(req.headers,null,' '));

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hey there client!  ');
  res.write('How are you today?\n');
  res.end();
  // Or just:
  //res.end('Hey there client!  How are you today?');
});

var port = process.argv[2] || 3000;
console.log('listening on port # '+port);
server.listen(port);


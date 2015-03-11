
var http = require('http');
var debug = require('./debug.js');

var server = http.createServer(function (req, res) {
  debug.logRequest(req);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  debug.logResponse(res, true);

  res.write('Hey there client!  ');
  debug.logResponse(res);

  res.write('How are you today?\n');
  debug.logResponse(res);

  res.end('bye!');

  // Or just:
  //res.end('Hey there client!  How are you today?');
});

var port = process.argv[2] || 3000;
console.log('listening on port # '+port);
server.listen(port);



var http = require('http');

var server = http.createServer(function (req, res) {
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

// When this server is running, visit http://localhost:3000 with three different clients:
// 1) a browser
// 2) the terminal: curl locahost:3000
// 3) A REST client, e.g.
// "Simple REST client":
// http://chrome.google.com/webstore/detail/simple-rest-client/fhjcajmcbmldlhcimfajhfbgofnpcjmb
// Or "POSTman":
// https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm

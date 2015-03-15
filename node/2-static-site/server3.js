// Even better: let st handle everything,
// including the initial response with index.html...

var http = require('http');

var Router = require("routes-router");
var router = Router(); 

var st = require('st');

// index.html can be handled in the same route!
router.addRoute("/*", st({
  path: __dirname + "/public",
  // The 'index' property maps the route '/' onto '/public/index.html'
  index:'/index.html'
}));


var server = http.createServer(router);
var port = process.argv[2] || 3000;
console.log('server listening on port # '+port);
server.listen(port);
var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

var indexFile = process.argv[2] || 'testA';

// Route for static files:
router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/'+indexFile+'.html' //allows alternative files
}));

var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);
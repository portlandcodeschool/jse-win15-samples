var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

// Create api routes:
router.addRoute("/api*", {
	// GET method receives data in opts.query:
	GET:  function(req,res,opts) {
			console.log("\n---Getting---");
			console.log(JSON.stringify(opts,null,2));
			res.end("Got it!\n");
	},

	// Other three methods receive data in the request body,
	// which isn't read here
	PUT:  function(req,res,opts) {
			console.log("\n---Putting---");
			console.log(JSON.stringify(opts,null,2));
			res.end("It's put!\n");
	},
	POST: function(req,res,opts) {
			console.log("\n---Posting---");
			console.log(JSON.stringify(opts,null,2));
			res.end("It's posted!\n");
	},
	DELETE: function(req,res,opts) {
			console.log("\n---Deleting---");
			console.log(JSON.stringify(opts,null,2));
			res.end("It's deleted!\n");
	}
});


// The static route pattern (/*) includes /api,
//  so it should be listed last, as an alternative to /api:

var indexFile = process.argv[2] || 'testA';

router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/'+indexFile+'.html' //allows alternative files
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);
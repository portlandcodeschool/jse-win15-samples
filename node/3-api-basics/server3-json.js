var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

// The body module handles the async parsing of the data in a
// POST/PUT/DELETE request:
//var parseBodyText = require('body');
var parseBodyJSON = require('body/json');

function parseBody(req,res,opts,message) {
	console.log(JSON.stringify(opts,null,2));

	parseBodyJSON(req,res,function(err,body) {
		if (err) {
			res.statusCode = 418;// override default 200
			console.log('DOH! Invalid JSON!');
			console.log(err);
			return res.end("Request failed!")
		}
		console.log('body = '+body);
		console.log('type = '+typeof body);
		if (typeof body === 'object')
			console.log(body);
		res.end(message);
	})

}

// Create api routes:
router.addRoute("/api*", {
	// GET method receives data in opts.query:
	GET:  function(req,res,opts) {
			console.log("\n---Getting---");
			console.log(JSON.stringify(opts,null,2));

			var dummyData = {hello:'world'};
			res.end(JSON.stringify(dummyData));
	},

	// Other three methods receive data in the request body,
	// using processBody callback:
	PUT:  function(req,res,opts) {
			console.log("\n---Putting---");
			parseBody(req,res,opts,"It's put!\n");
	},
	POST: function(req,res,opts) {
			console.log("\n---Posting---");
			parseBody(req,res,opts,"It's posted!\n");
	},
	DELETE: function(req,res,opts) {
			console.log("\n---Deleting---");
			parseBody(req,res,opts,"It's deleted!\n");
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
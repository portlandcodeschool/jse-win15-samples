var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

var db = require('./datastore');

// The body module handles the async parsing of the data in a
// POST/PUT request:
//var parseBodyText = require('body');
var parseBodyJSON = require('body/json');

function parseBody(req,res,opts,fn) {
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

		// get id (if any) from options
		var id = opts.splats[0].slice(1);
		id = fn(id,body);
		res.end(JSON.stringify({id:id}));
	})

}

// Create api routes:

 //special route to log data store:
router.addRoute("/list", {
	GET: function(req,res,opts) {
		console.log('\n---- Listing Data Store---')
		db.list();
		res.end();
	}
});

// normal route for server <-> client data:
router.addRoute("/api*", {
	// GET method receives data in opts.parsedUrl.query:
	GET:  function(req,res,opts) {
			console.log("\n---Getting---");
			console.log(JSON.stringify(opts,null,2));

			var id = opts.splats[0].slice(1);
			var dataObj = db.read(id);
			var dataString = JSON.stringify(dataObj);
			console.log('id: ',id);
			console.log('data retrieved:',dataString);
			res.end(dataString);
	},

	// Other three methods receive data in the request body,
	// using processBody callback:
	PUT:  function(req,res,opts) {
			console.log("\n---Putting---");
			parseBody(req,res,opts,db.update);
	},
	POST: function(req,res,opts) {
			console.log("\n---Posting---");
			parseBody(req,res,opts,db.create);
	},
	DELETE: function(req,res,opts) {
			console.log("\n---Deleting---");
			parseBody(req,res,opts,db.delete);
	}
});


// The static route pattern (/*) includes /api,
//  so it should be listed last, as an alternative to /api:

var indexFile = process.argv[2] || 'testD';

router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/'+indexFile+'.html' //allows alternative files
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);
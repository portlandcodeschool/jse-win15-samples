var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

var db = require('./datastore');

// The body module handles the async parsing of the data in a
// POST/PUT request:
//var parseBodyText = require('body');
var parseBodyJSON = require('body/json');

function getData(res,opts) {
	console.log(JSON.stringify(opts,null,2));

	var id = opts.params.id || opts.parsedUrl.query;
	var dataObj = db.read(id);
	var dataString = JSON.stringify(dataObj);
	console.log('id: ',id);
	console.log('data retrieved:',dataString);
	res.end(dataString);
}

function setData(res,opts,fn,body) {
	var id = opts.params.id;
	console.log('incoming id: '+id);
	id = fn(id,body);
	console.log('outgoing id: '+id);
	res.end(JSON.stringify({id:id}));
}

function setWhenReady(req,res,opts,fn) {
	console.log(JSON.stringify(opts,null,2));

	if (!req) { //no request --> respond immediately
		return setData(res,opts,fn);
	}
	// else must parse JSON body before responding
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

		setData(res,opts,fn,body);
	});
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
router.addRoute("/api/:id", {
	GET:  function(req,res,opts) {
			console.log("\n---Getting One---");
			getData(res,opts);
	},

	PUT:  function(req,res,opts) {
			console.log("\n---Putting---");
			setWhenReady(req,res,opts,db.update);
	},

	DELETE: function(req,res,opts) {
			console.log("\n---Deleting---");
			setWhenReady(null,res,opts,db.delete);
	}
});

router.addRoute("/api",{
	GET:  function(req,res,opts) {
			console.log("\n---Getting All---");
			getData(res,opts);
	},
	
	POST: function(req,res,opts) {
			console.log("\n---Posting---");
			setWhenReady(req,res,opts,db.create);
	},
})

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
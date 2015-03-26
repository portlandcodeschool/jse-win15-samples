var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

//var db = require('./datastore');
// Database access:
// You need a config.js with your own database application key
var config = require('./config.js');
// instantiate the orchestrate class with your own key to create a private accessor:
var db = require('orchestrate')(config.dbKey);

var dbCollectionName = 'test-table'; // which db collection to use


// The body module handles the async parsing of data in a POST/PUT request:
var parseBodyJSON = require('body/json');

// Helper functions to process Orchestrate replies:
function extractValue(dbItem) {
	return dbItem.value;	
}

function simplifyRecord(dbItem) {
	var pair = {};
	pair[dbItem.path.key] = extractValue(dbItem);
	return pair;
}


var _lastID = 0;
function generateID() {
	var id = Date.now();
	// ensure no duplicates by sometimes adding '.N' suffix:
	if (id > _lastID) {
		_lastID = id;
	} else {
		id = _lastID = Number(_lastID)+(.1);
	}
	return id;
}

function listData() {
	db.list(dbCollectionName)
		.then(function(result){
			var summary = result.body.results.map(simplifyRecord);
			console.log(JSON.stringify(summary,null,2));			
		})
}

// CRUD functions:
function readData(res,opts) {
	var key = opts.params.id || opts.parsedUrl.query;
	console.log('incoming id: ',key);
	if (key)
		return readOne(res,key);
	else
		return readAll(res);
}

function readAll(res) {
	db.list(dbCollectionName)// promise...
		.then(function(result){
			console.log("Database response:")
			console.log(result.body);
			var values = result.body.results.map(extractValue);
			console.log("Data retrieved");
			console.log(values);
	    	res.end(JSON.stringify(values)); // send values as JSON
		})
		.fail(function(err){
			console.log("error: "+err);
        });
}

function readOne(res,key) {
	db.get(dbCollectionName,key)
		.then(function(results){
			var value = results.body;
			console.log("Data retrieved");
			console.log(value);
	    	res.end(JSON.stringify(value)); // send values as JSON
		})
		.fail(function(err){
			console.log("error: "+err);
    	})
}

function deleteData(res,opts) {
	var key = opts.params.id;
	console.log('incoming id: '+key);

	db.remove(dbCollectionName,key,true)
	  .then(function(result){
	  	res.end('OK');
	  })
	  .fail(function(err){
	  	res.end(err);
	  })
}

function updateData(res,opts,body) {
	var key = opts.params.id;
	console.log('incoming id: '+key);

	db.put(dbCollectionName,key,body)
	  .then(function(result){
	  	res.end('OK');
	  })
	  .fail(function(err){
	  	res.end(err);
	  })
}

function createData(res,opts,body) {
	var key = generateID();
	console.log('generating id: '+key);

	db.put(dbCollectionName,key,body) //promise...
		.then(function(result){
			res.end(JSON.stringify({id:key}));
		})
		.fail(function(err){
			res.end(err);
		});
}

// Wrapper which calls CRUDfn when request body is ready:
function whenReady(req,res,opts,CRUDfn) {
	console.log(JSON.stringify(opts,null,2));

	if (!req) { //no request --> respond immediately
		return CRUDfn(res,opts);
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

		CRUDfn(res,opts,body);
	});
}

// Create api routes:

 //special route to log data store:
router.addRoute("/list", {
	GET: function(req,res,opts) {
		console.log('\n---- Listing Data Store---')
		listData();
		res.end();
	}
});

// normal route for server <-> client data:
router.addRoute("/api/:id", {
	GET:  function(req,res,opts) {
			console.log("\n---Getting One---");
			whenReady(null,res,opts,readData);
	},

	PUT:  function(req,res,opts) {
			console.log("\n---Putting---");
			whenReady(req,res,opts,updateData);
	},

	DELETE: function(req,res,opts) {
			console.log("\n---Deleting---");
			whenReady(null,res,opts,deleteData);
	}
});

router.addRoute("/api",{
	GET:  function(req,res,opts) {
			console.log("\n---Getting All---");
			whenReady(null,res,opts,readData);
	},
	
	POST: function(req,res,opts) {
			console.log("\n---Posting---");
			whenReady(req,res,opts,createData);
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
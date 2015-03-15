var http = require('http');

var fs = require('fs');

var Router = require("routes-router"); //<-- this is a router-factory
var router = Router(); //<-- this is a router instance

var sendHtml = require("send-data/html");

// debug is a custom module which makes it easier to see the HTTP transaction details:
var debug = require('./debug.js');

//------ Defining Routes -------

// When someone asks for the root of our site, send them index.html:
router.addRoute("/", function (req, res) {
	debug.logRequest(req);
	// asynch- read the file public/index.html...
	fs.readFile('./public/index.html', {encoding: 'utf8'},
		// when the file is read, run this callback:
		function (err, data) { // err and data are filled in by readFile
			if (err) console.error(err);

			// Transmit the file as a response to the client:
			// Option 1: construct response manually (with logging):
			/*
			res.writeHead(200, {'Content-Type': 'text/html'});//<-- send a header
			console.log('Data is type: ' + (typeof data));
			debug.logResponse(res,true);
			res.write(data); //<-- send the data
			debug.logResponse(res);
			res.end(); //<-end transmission
			*/

			// OR Option 2: use module "send-data":
			sendHtml(req, res, data);
		});
});

// Use npm module "st" to handle requests for "static assets":
var st = require('st');

// Create a second route to handle anything else (not simply '/'),
// and tell st() where to look for those assets:
router.addRoute("/*", st({
  path: __dirname + "/public"
}));



// -------- Creating Server --------

// create a server, pass in our router function, store the server instance in a variable
var server = http.createServer(router);
var port = process.argv[2]	//get port # from command-line argument
			|| 3000; 		//or use default if no such argument
console.log('server listening on port # '+port);
//tell the server to start listening on port:
server.listen(port);
// "http" is a module from node.js, sometimes referred to as "node core"
// (core modules come with node and don't need to be downloaded and installed with npm).
// "http" is a module that helps you write "clients" and "servers" which use
// the HTTP protocol
var http = require('http');

// "fs" is a core module that helps you interact with your computer's file system
var fs = require('fs');

// "routes-router" is a module from npm that helps you
// make routes in your server much more easily
var Router = require("routes-router"); //<-- this is a router-factory
// Router() returns a router instance:
var router = Router(); //<-- this is a router instance

// "send-data" is a module that helps a server respond to client requests
// more easily.  In this case, we are using the html function from the 
// send-data module since we are sending only an html file right now. 
// (besides our static file handler, of course)
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
			res.writeHead(200, {'Content-Type': 'text/html'});//<-- send a header
			console.log('Data is type: ' + (typeof data));
			debug.logResponse(res,true);
			res.write(data); //<-- send the data
			debug.logResponse(res);
			res.end(); //<-end transmission

			// OR Option 2: use module "send-data":
			//sendHtml(req, res, data);
		});
});

// BUT: this server will FAIL when the client subsequently asks for
// any embedded "static assets",
// supplementary files (e.g. css, js) listed in the html pages. 


// -------- Creating Server --------

// create a server, pass in our router function, store the server instance in a variable
var server = http.createServer(router);
var port = process.argv[2]	//get port # from command-line argument
			|| 3000; 		//or use default if no such argument
console.log('server listening on port # '+port);
//tell the server to start listening on port:
server.listen(port);
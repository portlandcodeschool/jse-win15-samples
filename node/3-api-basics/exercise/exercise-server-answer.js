var duck = {
	noise:'quaaack!',
	moves: {
		land:['waddle','boogie'],
		air:['fly'],
		water:['paddle','dive']
	}
};


// Load the required modules here...
var st = require('st');
var http = require('http');

var Router = require("routes-router");

// Create a router...
var router = Router(); 

var parseBodyJSON = require('body/json');
// Create api route:
router.addRoute("/duck", {
	// Exercise 1: handle a GET request by sending client a copy of duck
	GET:  function(req,res,opts) {
		console.log('sending duck...');
		res.end(JSON.stringify(duck));
	},

	// Exercise 2: handle POST request by
	// 1) reading the body as json, and when it's ready,
	// 2) set duck to that json object, and log it to see results
	POST: function(req,res,opts) {
			parseBodyJSON(req,res,function(err,body) {
				duck = body;// <-- sets duck to json object in req body
				console.log('duck is now: ');
				console.log(duck);
				res.end('OK');
			});
	}
});


// Add a route '/*' to serve the static client files:
router.addRoute("/*", st({
	path: __dirname + "/public",
	index:'/exercise-answer.html' // main client file
}));

// Make a server which uses router and start it listening on port #1337 (or another)
var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);

// The data store: one object!
var duck = {
	noise:'quaaack!',
	moves: {
		land:['waddle','boogie'],
		air:['fly'],
		water:['paddle','dive']
	}
};


// Load the other required modules here...



// For exercise 2, you'll need this module:
var parseBodyJSON = require('body/json');


// Create a router...


// Create api route:
router.addRoute("/duck", {
	// Exercise 1: handle a GET request by sending client a copy of duck
	GET:  function(req,res,opts) {

	},

	// Exercise 2: handle POST request by
	// 1) reading the body as json, and when it's ready,
	// 2) set duck to that json object, and log it to see results
	POST: function(req,res,opts) {
		parseBodyJSON(req,res, /* some callback here */);
	}
});


// Add a route '/*' to serve the static client files:
router.addRoute("/*", st({
	path: __dirname + "/public",
	index:'/exercise.html' // main client file
}));

// Make a server which uses router and start it listening on port #1337 (or another)

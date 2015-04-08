// Components for basic routing:
var http = require("http");
var st = require("st");
var Router = require("routes-router");
var router = Router();
var redirect = require("redirecter");

// Components for generating/sending responses to client:
var templates = require("./server-templates/compile-templates");
var sendHtml = require("send-data/html");
// May also need send-data/json for API responses

// Components for authentication and session persistence:
var formBody = require("body/form"); // parses login form
var pwd = require("pwd"); // hashes passwords

// Database stores users and authentication hashes:
var config = require('./config');
var db = require('orchestrate')(config.dbKey);
// If offline, use this volatile store:
// var db = require("./fake-db");

// Session allows login to persist:
var Session = require("generic-session");
var store = Session.MemoryStore();


// ---- Debugging/Data-watching ----
var _ = require('underscore');
function showSession(session) {
  console.log(_.pick(session,['options','store','expire','token','id']));
  													// excludes: 'cookies','request','response'
  session.getAll(function(err,props) {
    console.log(props); // data from store belonging to session
  });
}

// ----- Creating users -----
//uncomment (and customize) to create a user:
//var createUser = require('./create-user')(db,"users");
//createUser("steve", "123"); 
//createUser("testuser","password");


// ----- Authenticating users -----

function authenticate(name, password, callback) {
	if (!name) name = " ";//ensure non-empty name
	db.get('users', name)
		.then(function(result){
			// found user, but still need to check password...
			var user = result.body;
			if (!user)
				// key (name) was found, but user is empty...
				return callback(new Error("empty response"));

			pwd.hash(password, user.salt, function (err, hash) {
				if (err)	// error reconstructing the hash
									// (probably an invalid or missing salt)
					return callback(err);

				// got a hash from password; compare it to stored user.hash...
				if (String(hash) === user.hash) //success!
					return callback(null, user);
				else
					callback(new Error("invalid password for "+name));
			})
		})
		.fail(function (err) {
			//failed to return user with key of name
			callback(new Error("user not found: "+name));
		});
}

// ----- Handle Routes -----

// All route-handler functions get parameters (req,res,opts,errCallback).
// errCallback, pre-defined by routes-router,
//  is just a function which sends a JSON error response to client.


function restrict(proceedFn) {
	// generate a route-handler which calls proceedFn only after authenticating
	return function (req, res, opts, errCallback) {
		var session = Session(req, res, store);
		// check session for current user:
		session.get("user", function (err, user) {
			if (err)
				return errCallback(err);
			if (user) //a user is currently logged in, may proceed:
				return proceedFn(req, res, opts, errCallback);

      // else no current user; demand login:
			redirect(req,res,"/login");
		});
	}
}

//  Main route:
//  requires login (or persisting login from earlier),
//  then serves restricted index page
router.addRoute("/", restrict(function (req, res) {
	//how to proceed once a user is logged in:
	var session = Session(req, res, store);
	session.get("user", function (err, user) {
		var message = "Welcome " + user.name.toString();
		sendHtml(req, res, templates.index({message:message}));
	});
}));


router.addRoute("/logout", function (req, res, opts, errCallback) {
	var session = Session(req, res, store);

	session.destroy(function (err) { //delete user's session
		if (err) return errCallback(err);
		redirect(req, res, "/login");
	});
});


router.addRoute("/login", {
	GET: function (req, res, opts, errCallback) { //display login page...
		// Customize login page after failed attempts with special message:
		var message = "";
		if (opts.parsedUrl.query === "retry")
			message = "<p class='msg error'> Login failed.  Try again. </p>";
		// Send client the login page:
		sendHtml(req, res, templates.login({ message: message }))
  },

	POST: function (req, res, opts, errCallback) { //process login form...

		formBody(req, res, function (err, body) { // when form body is ready...
			if (err) return errCallback(err);

			authenticate(body.username, body.password, function (err, user) {
				// This function is called when authentication is done,
				// with either failure (non-null err) or success (null err, non-null user)

				if (err || !user) {// login failed, try again...
					console.log(err);
					redirect(req, res, "/login?retry");

				} else { //have authenticated user, proceed...
					var session = Session(req, res, store);

					console.log('user validated: ' + user.name);
					//reset session user data, then redirect to main route:
					session.set("user", user, function (err) {
						if (err) return errCallback(err);
						showSession(session);//for debugging
						redirect(req, res, "/");
					})
          
				}//else
			})//authenticate
		})//formBody
	}
});

// serve static client files:
router.addRoute("/public/*", st({
	path: __dirname + "/public",
	url: "/public"
	// no default index file; the route "/" above handles that
}));

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");

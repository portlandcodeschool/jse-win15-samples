/*
Hashing...

In terminal:
$ md5 -s "password"
$ md5 -s "passwrod"
$ md5 -s "passworf"

Salting...

$ md5 -s "password1"
$ md5 -s "password2"
$ md5 -s "password8"

What you store in database:

auth = {
  salt:8
  hash:b25ef06be3b6948c0bc431da46c2c738
}

Then see if

md5("password"+auth.salt) === auth.hash

i.e. if
$ md5 -s "password8"
produces auth.hash

*/

// ---- npm module: pwd ----

// Encoding:
// given a password,
// pwd.hash(password,cb) generates both hash and salt

var pwd = require('pwd');
pwd.hash("password", function (err, salt, hash) {
	// when hashing is ready...
	console.log("salt=",salt);
	console.log("stored hash=",hash);

	var auth = {
		salt: salt,
		hash: hash
	};

	// store auth in db...

	// Time passes, then later...
	authenticate("password",salt);
});

// Authenticating:
// given a password and salt,
// pwd.hash(password,salt,cb) reconstructs the corresponding hash
function authenticate(password,salt) {
	pwd.hash(password,salt,function (err,hash) {
		// when hashing is ready...
		console.log("reconstructed hash=",hash)
	})
}

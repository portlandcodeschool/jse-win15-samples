
//  Volatile data store:
var _data = {
	//initial demo data
	sample1: {hello:'world'},
	sample2: {fizz:'buzz'}
};
var _nextID = 1;

// Interface object
// supports "CRUD" methods
// create --> POST
// read --> GET
// update --> PUT
// delete --> DELETE
var db = {
	read: function(id) {
		if (id)
			return _data[id]; //return one stored value
		// else no valid id...
		//return _data; //return everything
		// return array of all values:
		return Object.keys(_data).map(function(key) {
			return _data[key];
		})
	},

	create: function(junk, obj) {
		// ignore the first parameter,
		if (!obj) // unless the second one is missing,
			obj = junk; // then use it
		// generate a unique id:
		var id = _nextID++;
		_data[id] = obj;
		return id;
	},

	update: function(id, obj) {
		_data[id] = obj;
		return id;
	},

	delete: function(id) {
		delete _data[id];
		return id;
	},

	// print everything to console:
	list: function() {
		for (var id in _data) {
			console.log(id+':'+JSON.stringify(_data[id]));
		}
	}

}


module.exports = db;
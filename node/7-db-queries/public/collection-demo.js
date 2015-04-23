// Demo for updating a partially-saved backbone collection

var TestModel = Backbone.Model.extend({
	defaults: {
		count:0
	}
});




var TestColl = Backbone.Collection.extend({
	url: '/api',
	model:  TestModel,
	display: function() { //custom method
		console.log("Keys:  "+this.pluck('key'));
		console.log("Counts:"+this.pluck('count'));
		console.log("Ids:   "+this.pluck('id').map(function(id){
			return isNaN(id)?'-':id
		}));
	},

	ensureModel: function(key) {
		var models = this.where({key:key});
		if (models.length > 1) throw "found multiple models";
		if (models.length === 1)
			return models[0];
		// else add a new model with that key:
		var model = new TestModel({key:key});
		this.add(model);
		return model;
	},

	refreshModel: function(attrObj) {
		console.log(attrObj);
		var model= this.ensureModel(attrObj.key);
		model.set("id",attrObj.id);
		model.set("count",attrObj.count);
	},

	// Customized fetch, which matches incoming keys to existing ones:
	refresh: function(keyStr) {
		var self = this;
		if (!keyStr)
			keyStr = this.pluck('key').join(',');
	// Make a GET request listing all keys of collection (in URL query)
		// Can simulate in terminal: curl localhost:1337/api?keys=1,2,3
		$.get("/api","keys="+keyStr, function(dataStr) {
			// dataStr is JSON array describing models currently in database
			var arr = JSON.parse(dataStr);
			arr.forEach(function(model){
				self.refreshModel(model)
			});
			self.display();
		});
	}
})

var coll = new TestColl();
coll.display();

function populateDB() {
	var dataset = new TestColl();
	for (var key = 1; key<50; key+=2) {
		dataset.create({
			key:key,
			count:1,
			//id:key
		})
	}
}


// usage:
//refreshCollection();  // loads any models saved to db
// OR
// refreshCollection('x,y,z'); //load only models x,y,z
// OR include range:
// refreshCollection('a,b,j-p,y,z') //load a,b,y,z, and anything in the range j-p


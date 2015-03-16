function acceptResponse(data,status,jqXHR) {
	console.log('Response data: '+JSON.stringify(data));
	console.log('Response status: '+status);
	console.log(jqXHR);
}



// Singleton model:
var SingleModel = Backbone.Model.extend({
	url: '/api'
});

var test = new SingleModel({name:'thing', color:'bluish'});

// Collection of models:
var PluralModel = Backbone.Model.extend({});
var Coll = Backbone.Collection.extend({
	model:PluralModel,
	url:'/api'
});

var coll = new Coll();


function populate() {
	coll.create({name:'Ernie',color:'orange'});
	coll.create({name:'Bert',color:'yellow', id:'bert'});
}

console.log('test.save(), test.fetch(), populate()');

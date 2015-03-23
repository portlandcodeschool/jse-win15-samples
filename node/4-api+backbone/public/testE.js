

function successFn(coll,res,opts) {
	console.log('Woot!');
	console.log('Response data: ');
	console.log(res);
	console.log('Collection is now: ');
	console.log(coll.models);
}


// Single model:
var SingleModel = Backbone.Model.extend({
	url: '/api'
});
var model = new SingleModel({name:'thing', color:'bluish'});

// Collection of models:
var PluralModel = Backbone.Model.extend({
/*
	sync: function(meth,model,opts) {
		console.log('Model sync...');
		console.log(meth);
		console.log(model);
		console.log(opts);
	}
*/
});

var Coll = Backbone.Collection.extend({
	model:PluralModel,
	url:'/api',
/*
	sync: function(meth,model,opts) {
		console.log('Collection sync...');
		console.log(meth);
		console.log(model);
		console.log(opts);

	}
*/
});

var coll = new Coll();


function populate() {
	coll.create({name:'Ernie',color:'orange'});
	coll.create({name:'Bert',color:'yellow', id:'bert'});
}

function list() {
	$.get("/list");
}
console.log('list(), model.attributes, model.save(), list(), model.attributes');
console.log('model.save(), model.fetch()');
console.log('coll.fetch(), coll.models');
console.log('coll.fetch({success:successFn}),');
console.log('populate(), coll.models');
console.log('coll.fetch()');// problem: some ids are gone!
// EXERCISE: fix it!
// (Hint: the server is representing the object's id differently from Backbone.
// Change the server to feed Backbone the ids it expects.)



// ACTIVITY: explore sync...


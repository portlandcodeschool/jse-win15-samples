
// --- Simple model ---
var MyModel = Backbone.Model.extend({
	protoProp: "I'm a model prototype"
});

// Make a model (one instance of class MyModel):
var model1 = new MyModel({
	personalAttr: "Here's my attribute",
	personalAttr2:"Here's another"
});

console.log(model1);
console.log(model1.attributes);
console.log(model1.get('personalAttr'));

// --- Simple view ---
var MyView = Backbone.View.extend({
	protoProp: "I'm a view prototype",
	el: '#my-app',
	render: function () {
		// refer to model attributes
    	$(this.el).html(model1.get('personalAttr'));
  	}
});

// When ready:
var myview;
$(function () {
  myview = new MyView();
  myview.render();
});

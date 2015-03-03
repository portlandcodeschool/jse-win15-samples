
var todo = { //same pseudo-model as before
	title: 'mow the lawn',
	description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass',
	set: function (property, value) {
		console.log('Setting '+property);
		this[property] = value;
		$(document).trigger('ZOMG!change!', //custom event name
							{"model": this}) // optional data
	},
	get: function (property) {
		return this[property];
	}
};

var TodoListView = Backbone.View.extend({
	// insert your Exercise 1 code here
});


// ---- Exercise 2 ----
// Write a Backbone View to manage the input area (#todo-form):

var TodoInputView = Backbone.View.extend({
	el: '#todo-form',
	model: todo,
	events: {
		/* do something when button #add-todo is clicked*/
	},
	processInput: function (event) {

	}
});
// ------------------

// When DOM is ready...
var listView, inputView;
$(function () {

  // Create input view, which handles button clicks
  inputView = new TodoInputView();

  // Create list view and display initial data:
  listView = new TodoListView();

});
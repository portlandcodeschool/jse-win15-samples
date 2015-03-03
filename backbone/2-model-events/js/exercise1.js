
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

// ---- Exercise 1 ----
// Write a Backbone View to manage the output area (#todo-list):

var TodoListView = Backbone.View.extend({
	el: '#todo-list',
	model: todo,
	initialize: function () {
		// attach a listener to $(document) which detects model-change events
		// (e.g. 'ZOMG!...') and triggers this.render
		$(document).on(/*...*/);

		// render initially:
		this.render();
  	},
	render: function () {
		// redraw my el to display my model
		// in the format '<li><strong>title</strong>description</li>'

	}
});
// ------------------

function processInput(event) {
	event.preventDefault();
	console.log("Updating model")
	var $title = $('#todo-input'),
		$description = $('#description-input');
	// change model using inputs:
	todo.set('title', $title.val());
	todo.set('description', $description.val());
	// clear form inputs:
	$title.val('');
	$description.val('');
};

// When DOM is ready...
var listView;
$(function () {

	// Make button process the form:
  $('#add-todo').click(processInput);


  // Create list view and display initial data:
  listView = new TodoListView();

});
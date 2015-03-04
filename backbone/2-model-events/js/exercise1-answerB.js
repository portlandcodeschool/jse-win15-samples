
var todo = { //same pseudo-model as before
	title: 'mow the lawn',
	description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass',
	set: function (property, value) {
		console.log('Setting '+property);
		this[property] = value;
				
		// Solution B: use Backbone's 'trigger' on todo:
		this.trigger('ZOMG!change!', //custom event name
							{"model": this}) // optional data
	},
	get: function (property) {
		return this[property];
	}
};

// Let non-Backbone object todo handle Backbone events:
_.extend(todo,Backbone.Events);

// ---- Exercise 1 ----
// Write a Backbone View to manage the output area (#todo-list):

var TodoListView = Backbone.View.extend({
	el: '#todo-list',
	model: todo,
	initialize: function () {

		// Solution B: use Backbone's 'on' with todo:
		this.model.on('ZOMG!change!',this.render,this);

		// render initially:
		this.render();
  	},
	render: function (arg) {
		// redraw my el to display my model
		// in the format '<li><strong>title</strong>description</li>'
		this.$el.html(
			'<li><strong>' + this.model.get('title') + ':</strong> '
			+ this.model.get('description') + '</li>'
		);

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
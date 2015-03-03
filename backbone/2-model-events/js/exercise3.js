// ---- Exercise 3 ----
// Rewrite todo as a Backbone Model instance
var Todo = Backbone.Model.extend({});

var todo = new Todo(/*...initial data here...*/);

// You can omit the set() and get() methods from earlier;
// Todo will use set() and get() methods inherited from Backbone.Model.
// The inherited set() will automatically trigger a 'change' event on the model.
// You'll need to change your TodoListView's event handler (see below).



var TodoListView = Backbone.View.extend({
	// insert your Exercise 1 code here

	// BUT ALSO:
	// replace your old event handler
	// $(document).on('ZOMG!change!'
	// with this:
	this.model.on('change', this.render, this);

});

var TodoInputView = Backbone.View.extend({
	// Insert your Exercise 2 code here
});

// When DOM is ready...
var listView, inputView;
$(function () {

  // Create input view, which handles button clicks
  inputView = new TodoInputView();

  // Create list view and display initial data:
  listView = new TodoListView();

});
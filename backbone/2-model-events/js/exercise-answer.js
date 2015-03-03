var Todo = Backbone.Model.extend({});

var todo = new Todo({
	title: 'mow the lawn',
	description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'
});

var TodoInputView = Backbone.View.extend({
	el: '#todo-form',
	model: todo,
	events: {
		'click #add-todo': 'processInput'
	},
	processInput: function (event) {
		event.preventDefault();
		console.log("Updating model")
		var $title = this.$el.find('#todo-input'),
			$description = this.$el.find('#description-input');
		// change model using inputs:
		this.model.set({
			title: $title.val(),
			description: $description.val()
		});
		// clear form inputs:
		$title.val('');
		$description.val('');
	}
});

var TodoListView = Backbone.View.extend({
	el: '#todo-list',
	model: todo,
	initialize: function () {
		this.model.on('change:title', this.render, this); //re-render only on title change of the model
			// this.model.on('change', this.render, this); // re-render on any change of the model
		this.render();
		},
	render: function () {
		this.$el.html(
			'<li><strong>' + this.model.get('title') + ': </strong>' + 
			this.model.get('description') + '</li>'
		);
	}
});

var todoInputView, todoListView;
$(function () {
	todoInputView = new TodoInputView();
	todoListView = new TodoListView();
});

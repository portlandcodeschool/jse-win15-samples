// Make a new subclass (Todo) of Backbone.Model:
var Todo = Backbone.Model.extend({});

// Make two models (each an instance of class Todo):
var todo1 = new Todo({
  title: 'mow the lawn'
});

var todo2 = new Todo({
	title: 'write the code'
});

// CHALLENGE: Create a new todo instance

console.log(todo1.attributes);

// CHALLENGE: Log your new todo to see its properties

var HomeView = Backbone.View.extend({
  el: '#my-app',
  render: function () {
    $(this.el).html('<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                    '<ol><li>' + todo1.get('title') + '</li>' + //QUESTION: add another li 
                    '<li>' + todo2.get('title') + '</li>' +
                    '</ol>');                             // with your new todo's title
  }
});

var homeview;
$(function () {
  homeView = new HomeView();
  homeView.render();
});

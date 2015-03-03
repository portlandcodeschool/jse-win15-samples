// See below for EXERCISE...

var app = {};

app.TodoModel = Backbone.Model.extend({});

app.TodosCollection = Backbone.Collection.extend({
  model: app.TodoModel,
  comparator: 'cid'
});

app.todosCollection = new app.TodosCollection();

app.todosCollection.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

app.TodoMainView = Backbone.View.extend({
  el: '#my-app',
  template: '<h1><i class="fa fa-check-square-o"></i> Todos</h1>' +
    '<form class="pure-form pure-form-stacked" id="todo-form">' +
      '<fieldset>' +
        '<div class="pure-control-group">' +
          '<label for="todo-input">Todo Title</label>' +
          '<input id="todo-input" class="form-control" type="text">' +
        '</div>' +
        '<div class="pure-control-group">' +
          '<label for="description-input">Todo Description</label>' +
          '<input id="description-input" class="form-control" type="text">' +                 
        '</div>' +
        '<div class="pure-controls">' +
          '<button id="add-todo" class="pure-button">Add todo</button>' +
        '</div>' +
       '</fieldset>' +
    '</form>' +
    '<br><br>' +
    '<h3>My Todos</h3>' +
    '<ol id="todo-list">' +
    '</ol>',
    render: function () {
      console.log('main view render function started');

      this.$el.html(this.template);

      app.todoInputView = new app.TodoInputView({collection: this.collection});
      app.todoListView = new app.TodoListView({collection: this.collection});
      app.todoListView.render();
    }
});

app.TodoInputView = Backbone.View.extend({
  el: '#todo-form',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function (event) {
    event.preventDefault();
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();
    this.collection.add({title: todoInput, description: descriptionInput});
    $description.val('');
    $todoInput.val('');
  }
});

app.TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      outputHtml += '<li><strong>' + item.get('title') + ':  </strong>' +
                     item.get('description') + '</li>';
    });

    $(this.el).html(outputHtml);
  }
});

//CHALLENGE: 
// Make it so that app.PurpleDivView gets rendered into the DOM.
// make sure this amazing purple div is placed after 
// #todo-list, as a sibling, not a child
// Remember, a Backbone view always needs to be "instantiated"
// and usually needs to be rendered

app.PurpleDivView = Backbone.View.extend({
  el:'#purple-div',
  render: function () {
    this.$el.html('hello purple div');
  }
});

$(function () {
  app.todoMainView = new app.TodoMainView({collection: app.todosCollection});
  app.todoMainView.render();
});

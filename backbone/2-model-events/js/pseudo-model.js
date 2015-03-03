// Make a single pseudo-model (non-Backbone) to hold one to-item:
var todo = {
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

function render (model) {
	console.log('Displaying model');
	$('#todo-list').html(
			'<li><strong>' + model.get('title') + ':</strong> '
			+ model.get('description') + '</li>'
	);
}

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
$(function () {

	// Make button process the form:
  $('#add-todo').click(processInput);

  // Display initial data:
  render(todo);

  // Listen for change event which re-renders:

  // DOM:
  // document.addEventListener("ZOMG!change!", function(event) {
  //		console.log(event);
  //		render(event.detail.model);
  // });
  
  // JQ:
  $(document).on('ZOMG!change!', function (event, data) {
    console.log(event);
    render(data.model);
  });

});
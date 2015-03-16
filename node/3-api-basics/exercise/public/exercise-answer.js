var duck = null; // will become duck object retrieved from server

function setDuck(data,status,jqXHR) {
	//duck = JSON.parse(data);
	duck = data;
}

// Exercise 1
function loadDuck() {
	// use $.get() to download the duck from the server.
	// Send the request to a url of '/duck', and expect a single json object in response
	// Upon success, set duck to that json-encoded object.
	//$.get('/duck','',setDuck);
	$.get('/duck','',setDuck,'json');
}

// Exercise 2
function saveDuck() {
	// use $.post() to upload the duck back to the server,
	// changing the server's duck to match this one.
	$.post('/duck',JSON.stringify(duck));
}


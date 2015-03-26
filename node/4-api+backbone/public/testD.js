function acceptResponse(data,status,jqXHR) {
	console.log('Response data: ');
	console.log(data);
	console.log('Data type: '+ typeof data);
	console.log('Response status: '+status);
	console.log(jqXHR);
}

var test = {
	url: '/api',
	get: function(str) {
		// return $.get(this.url,
		// 			str || "Query",
		// 			acceptResponse // <<-- success callback
		// 		);

		// OR
		$.ajax({
			url:this.url,
			method:'GET',
			data:str,
			type:'json'
		})
			.done(acceptResponse)
	},
	post: function(str,obj) {
		return $.post(this.url + '/' + str,
					JSON.stringify(obj),
					acceptResponse
				);
	},
	put: function(str,obj) {
		return $.ajax({
			url: this.url + '/' + str,
			method: 'PUT',
			data: JSON.stringify(obj),
		})
			.done(acceptResponse) // << preferred
	},
	del: function(str,obj) {
		return $.ajax({
			url: this.url + '/' + str,
			method: 'DELETE',
			data: JSON.stringify(obj),
		})
			.done(acceptResponse)
	}
}

function list() {
	$.get("/list");
}

console.log("list(), test.get(str), test.post('',obj), test.put('id',obj), test.del('id')");

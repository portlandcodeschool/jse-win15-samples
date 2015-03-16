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
		return $.get(this.url,
					str || "Query",
					acceptResponse // <<-- success callback
				);

		// OR
		// $.ajax({
		// 	url:this.url,
		// 	method:'GET',
		// 	data:str
		// })
		//	.done(acceptResponse)
	},
	post: function(str) {
		return $.post(this.url,
					str || "Data",
					acceptResponse
				);

		// OR
		// $.ajax({
		// 	url:this.url,
		// 	method:'POST',
		// 	data:str
		// })
		//	.done(acceptResponse)
	},
	put: function(str) {
		return $.ajax({
			url: this.url,
			method: 'PUT',
			data: str || "Data",
			//success: acceptResponse  // << works, but deprecated
		})
			.done(acceptResponse) // << preferred
	},
	del: function(str) {
		return $.ajax({
			url: this.url,
			method: 'DELETE',
			data: str || "Data",
			//success: acceptResponse
		})
			.done(acceptResponse)
	}
}

console.log('test.get(str), test.post(str), test.put(str), test.del(str)');

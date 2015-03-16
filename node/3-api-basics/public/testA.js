var test = {
	url: '/api',
	get: function(str) {
		return $.get(this.url,
					str || "Query"
				);

		// OR
		// $.ajax({
		// 	url:this.url,
		// 	method:'GET',
		// 	data:str
		// })

		// CURL equvalent:
		// curl localhost:1337/api?Query
	},
	post: function(str) {
		return $.post(this.url,
					str || "Data"
				);

		// OR
		// $.ajax({
		// 	url:this.url,
		// 	method:'POST',
		// 	data:str
		// })

		// CURL equivalent:
		// curl -X POST -d "Data" localhost:1337/api
	},
	put: function(str) {
		return $.ajax({
			url: this.url,
			method: 'PUT',
			data: str || "Data"
		})
		// CURL equivalent:
		// curl -X PUT -d "Data" localhost:1337/api
	},
	del: function(str) {
		return $.ajax({
			url: this.url,
			method: 'DELETE',
			data: str || "Data"
		})
		// CURL equivalent:
		// curl -X DELETE -d "Data" localhost:1337/api
	}
}

console.log('test.get(str), test.post(str), test.put(str), test.del(str)');

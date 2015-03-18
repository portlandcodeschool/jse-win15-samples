//var foursquareConfig; //<<- in config.js
var clientID = 'ZIKHKOZSUEUIUCQQYC3ZSJO0PTE54QCSVHL41UXFPIBZ'
				+foursquareConfig.clientID;
var clientSecret =  'H5115WSI5RHX05CAVFE0LTJJ4YR02KT1XTKOUJP2BPVI'
				+foursquareConfig.clientSecret;

var url = 'https://api.foursquare.com/v2/venues/explore';

var data = {
	client_id: clientID,
	client_secret: clientSecret,
	v: '20140612',//api version
	near: "Portland, OR",
	section: 'food',
	limit: 10,
	venuePhotos: 1,
	format:'json'
};

function go() {
	$.ajax(url, { data: data, dataType: 'jsonp' })
	 .then(function(data, status, xhr) {
			displayVenues(data, status, xhr);
	 });
}

function displayVenues(data,status,xhr) {
	console.log(data);
	console.log(status);
	console.log(xhr);
	var items = data.response.groups[0].items;
	items.forEach(displayItem);
	//moreImagesForItem(items[0]);
}

function displayItem(item) {
	var venue = item.venue;
	console.log(venue.name);
	console.log("\t"+venue.categories[0].shortName);
	console.log("\t"+venue.url);
	var image = venue.photos.groups[0].items[0];
	console.log("\t"+image.prefix+'width200'+image.suffix);
	moreImagesForItem(item,venue.name);
}

function moreImagesForItem(item,venueName) {
	var id = item.venue.id;
	var url = "https://api.foursquare.com/v2/venues/"+id+"/photos";
	var data = {
		client_id: clientID,
		client_secret: clientSecret,
		v: '20140612',
		limit:10
	};
	$.ajax(url, {data: data, dataType: 'jsonp'})
	 .then(function(data, status, xhr) {
	 	var photos = data.response.photos.items;
	 	console.log('Bonus Images for '+venueName+': ');
	 	console.log(photos);
		console.log('Sample image url: ');
		var url0 = photos[0].prefix + 'width200' + photos[0].suffix;
		console.log('\t'+url0);
	 });
}




// Allow listing of server-side data
function list() {
	$.get("/list");
}

// Collection of models:
var Card = Backbone.Model.extend({
	defaults: {
		position: 0, // the position in the shuffled colleciton
		value: null, // the card value (as defined by the cardset)
		status: 'facedown'
	}
});

var Cards = Backbone.Collection.extend({
	model:Card,
	url:'/api',
});

// Make a card set to determine its expected length;
//  if the saved set loads successfully, this new set isn't used.
var defaultCardSet = new AnimalCards(),
	defaultValues = defaultCardSet.values();

// Make an initially empty collection:
var cards = new Cards();


// EXERCISE: bootstrap a collection of 8 AnimalCards.
// That is, initialize the collection to be either
// 1) loaded from the server, so that the cards are restored
//   to that particular shuffled state; or if that fails*
// 2) generated anew and saved to the server in a new shuffled state.

// *Let 'failure' mean returning the wrong number of cards.


// Try to fetch first, with a success callback:
cards.fetch({success: function(coll,resp,opts) {

	// Assume fetch is successful if the number of cards returned is
	// equal to the expected number in the cardset.
	// ...
	
	// If unsuccessful, set up and save a new shuffled deck.
	// ...
}
});



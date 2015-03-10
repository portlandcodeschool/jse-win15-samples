// --- Models ---
var GamePieces = Backbone.Collection.extend({
    forward: function(from) {
        var delta = (from<32)? 8: -8;
        this.move(from,from+delta);
    },
    move: function(from,to) {
        var model=this.findWhere({sq:from});
        if (!model) return false;
        model.set({sq:to});
        // OR: model.set('sq',to);
        return true;
    }
});

var Checkers = (function() {

	var Checker = Backbone.Model.extend({
		defaults: {isKing: false}
	});

	var redStart = [1,3,5,7,8,10,12,14];
	var blackStart=[49,51,53,55,56,58,60,62];

	function makeChecker(where,color) {
		return {
			sq: where,
			color: color
		};
	}

	var Checkers = GamePieces.extend({
		model:Checker,
        gameName: 'Checker',
		initialize: function() {
			this.add(redStart.map(function(where){return makeChecker(where,'Light')}));
			this.add(blackStart.map(function(where){return makeChecker(where,'Dark')}));
		},
	});

	return Checkers;
})(); //end IIFE

var Chessmen = (function() {

	var ChessPiece = Backbone.Model.extend({
		defaults: {}
	});

    var backrow= ['R','Kt','B','Q','Kg','B','Kt','R'];
    var frontrow =['P','P','P','P','P','P','P','P'];

	function makePiece(color,piece,where) {
		return {
			sq: where,
            piece:piece,
			color: color
		};
	}

	var Chessmen = GamePieces.extend({
		model:ChessPiece,
        gameName: 'Chess',
		initialize: function() {
			this.add(backrow.concat(frontrow).map(function(name,idx){return makePiece('Light',name,idx)}));
			this.add(frontrow.concat(backrow).map(function(name,idx){return makePiece('Dark',name,idx+48)}));
		}
	});

	return Chessmen;
})(); //end IIFE


// --- Views ---
var SquareView = Backbone.View.extend({
	tagName: 'td',
	events: {'click': 'click'},
	initialize: function(opts) {
		this.n = opts.n;
		this.$el.appendTo(opts.$row);
	},
	render: function(model) {
		if (model===undefined) {
				model = this.collection.findWhere({sq:this.n}) || false;
		}
        var gameName = this.collection.gameName;
		//first clear any piece here before:
		this.$el.removeAttr('piece')
				.removeClass('Light Dark')
				.removeClass('Checker Chess');
		if (model) { // if piece here now, draw it:
            this.$el.attr('piece',model.get('piece'))
					.addClass(model.get('color'))
					.addClass(gameName);
		}
	},
	click: function(evt) {
		this.collection.forward(this.n);
	}
});


var BoardView = Backbone.View.extend({
	id:'checkerboard',
	tagName: 'table',
	initialize: function() {
		this.collection.on('change:sq',this.render,this);
		this.squares = [];//subviews
		var n=0;
		for (var i=0; i<8; ++i) {
			var $row = $('<tr>').appendTo(this.$el);
			for (var j=0; j<8; ++j) {
				var opts = {
					collection: this.collection,
					className: ((i%2==j%2)?'odd':'even'),
					$row: $row,
					n: n++
				}
				this.squares.push(new SquareView(opts));
			}
		}
		this.$el.appendTo('body');
	},
	render: function(model) {
		console.log("refreshing...");
		if (!model)
			this.squares.forEach(function(sq){sq.render()}); //render all
		else { //render just changed squares
			var newSq = model.get('sq');
			var oldSq = model.previous('sq');
			this.squares[newSq].render(model);
			this.squares[oldSq].render(false);
		}
	},
	/* EXERCISE:
	Implement the method changeGame(coll).
	Given parameter coll, representing a collection of pieces
	(i.e. a game), take these four steps:

	1) Add an event handler to make this board re-render
		whenever the new collection (coll) moves a piece
		(Hint: look for changes in the 'sq' attribute);
	2) Remove the corresponding event handlers from the old collection;
	3) Replace the 'collection' property of the board view and all square views
		with the new collection (coll)
	4) Re-render the entire board immediately, forcing each
		square to render itself according to whatever piece is there now.
	*/
	changeGame: function(coll) {


	}
});

var board = null, game1=null, game2=null;
function makeBoard() {
    game1 = new Checkers();
    game2 = new Chessmen();
	board = new BoardView({collection:game1});
	board.render();
}

$(makeBoard);

/* From the console, you should be able to call
`board.changeGame(game1)`
or
`board.changeGame(game2)`
and see the board redraw.
*/
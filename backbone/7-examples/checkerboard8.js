// --- Models ---
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

	var Checkers = Backbone.Collection.extend({
		model:Checker,
		initialize: function() {
			this.add(redStart.map(function(where){return makeChecker(where,'Light')}));
			this.add(blackStart.map(function(where){return makeChecker(where,'Dark')}));
		},
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

	return Checkers;
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
		if (!model) {
			this.$el.removeClass('Checker');
		} else {
			this.$el.addClass('Checker')
					.addClass(model.get('color'));
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
	}
});

var board = null, game=null;
function makeBoard() {
	game = new Checkers();
	board = new BoardView({collection:game});
	board.render();
}

$(makeBoard);

var Pub = (function() {
	function Pub() {
		var _stock = {generic:5};
		var _cash = 10;

		this.serve = function(beerName,num){
			var canServe = this.supply(beerName);
			num = (canServe < num)? canServe: Math.floor(num);
			_stock[beerName] -= num;
			_cash += this.price()*num;
			return num;
		}

		this.restock = function(beerName,num){
			var canAfford = Math.floor(this.cash()/this.cost());
			num = (canAfford < num)? canAfford: Math.floor(num);
			_stock[beerName] = this.supply(beerName)+num;
			_cash -= this.cost()*num;
			return num;
		}

		this.beerNames = function() {
			return Object.keys(_stock);
		}

		this.supply = function(beerName) {
			return _stock[beerName] || 0;
		}

		this.cash = function() {
			return _cash;
		}

		this.tip = function(amt) {
			_cash += amt;
		}

		this.price = function() {
			return 3;
		}
		this.cost = function() {
			return 2;
		}


	}

	return Pub;

})()

if (typeof module !== 'undefined') {
	module.exports = Pub;
}

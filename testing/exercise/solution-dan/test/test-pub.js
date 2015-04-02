try {
  var Pub = require('../pub.js');
  var chai = require('chai');
} catch(err) {}
var expect = chai.expect;

describe('Ye olde pub', function(){
	var pub = new Pub();
	before(function(){
	})

	function generateUniqueName() {
		// add a suffix to alphabetically last
		var currBeers = pub.beerNames().slice().sort();
		return currBeers.pop() + "xyz";
	}

	function ensureCashForBuying(num) {
		var need = pub.cost()*num,
			have = pub.cash();
		if (need>have)
			pub.tip(Math.ceil(need-have));
	}

	function beerWithExactSupply(num) {
		var beer = generateUniqueName();
		ensureCashForBuying(num);
		pub.restock(beer,num);
		return beer;
	}

	describe('tip(amount)',function() {
		it('should raise cash by amount', function() {
			var initial = pub.cash();
			pub.tip(7);
			expect(pub.cash()).to.equal(initial+7);
		})
	})

	describe('restock(beerName,num)',function() {
		it('should restock no more than cash affords',function() {
			// ensure cash for at least one purchase
			ensureCashForBuying(1);
			var beer = generateUniqueName();
			var maxAmt = Math.floor(pub.cash()/pub.cost());
			expect(pub.restock(beer,maxAmt+1)).to.equal(maxAmt);
			// now broke:
			expect(pub.restock(beer,1)).to.equal(0);
		});
		it('should raise supply by restocked amount',function(){
			ensureCashForBuying(1);
			var beer = generateUniqueName();
			var initial = pub.supply(beer);
			expect(pub.restock(beer,1))
				.to.equal(pub.supply(beer)-initial);
		});
		it('should lower cash by total cost',function(){
			ensureCashForBuying(1);
			var beer = generateUniqueName();
			var initial = pub.cash();
			expect(pub.cost() * pub.restock(beer,1))
				.to.equal(initial - pub.cash());
		})
	})

	describe('serve(beerName,num)',function() {
		it('should do nothing if beerName is unknown',function(){
			var beer = generateUniqueName();
			expect(pub.serve(beer,1)).to.equal(0);
			// also ensure no change to stock...
		});
		it('should serve no more than supply allows',function(){
			var beer = beerWithExactSupply(1);
			expect(pub.serve(beer,1)).to.equal(1);
			expect(pub.serve(beer,1)).to.equal(0);
		});
		it('should lower supply by amount served', function(){
			var beer = beerWithExactSupply(2);
			pub.serve(beer,1);
			expect(pub.supply(beer)).to.equal(1);
			pub.serve(beer,1);
			expect(pub.supply(beer)).to.equal(0);
		});
		it('should raise cash by servings times price',function(){
			var beer = beerWithExactSupply(2);
			var initial = pub.cash();
			var revenue = pub.serve(beer,2) * pub.price();
			expect(pub.cash()).to.equal(revenue+initial);
		})
	});
})
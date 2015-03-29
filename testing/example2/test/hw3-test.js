var chai = require('chai'); // lets us use the more verbose Chai assertion library
var assert = chai.assert; // we still need to set what 'assert' means
var cardTools = require('../hw3.js'); // note this means we need to export as a module

describe('cardTools object', function() {

  context('rank function', function() {
    it('should be a function', function() {
      assert.isFunction(cardTools.rank);
    });
    it('should return 1 when the card ID is 0', function() {
      assert.equal(cardTools.rank(0), 1);
    });
    it('should return 1 when the card ID is 3', function() {
      assert.equal(cardTools.rank(3), 1);
    });
    it('should return 13 when the card ID is 51', function() {
      assert.equal(cardTools.rank(51), 13);
    });
    it('should return NaN when the card ID is 52', function() {
      assert.isTrue(Number.isNaN(cardTools.rank(52)));
    });
    it('should return NaN when the card ID is "0"', function() {
      assert.isTrue(Number.isNaN(cardTools.rank('0')));
    });
    it('should return NaN when the card ID is -1', function() {
      assert.isTrue(Number.isNaN(cardTools.rank(-1)));
    });
    it('should return NaN when the card ID is 2.5', function() {
      assert.isTrue(Number.isNaN(cardTools.rank(2.5)));
    });
    it('should return NaN when the card ID is undefined', function() {
      assert.isTrue(Number.isNaN(cardTools.rank(undefined)));
    });
  });

  context('suit function', function() {
    it('should be a function', function() {
      assert.isFunction(cardTools.suit);
    });
    it('should return 1 when the card ID is 0', function() {
      assert.equal(cardTools.suit(0), 1);
    });
    it('should return 2 when the card ID is 5', function() {
      assert.equal(cardTools.suit(5), 2);
    });
    it('should return 4 when the card ID is 51', function() {
      assert.equal(cardTools.suit(0), 1);
    });
    it('should return NaN when the card ID is 52', function() {
      assert.isTrue(Number.isNaN(cardTools.suit(52)));
    });
    it('should return NaN when the card ID is false', function() {
      assert.isTrue(Number.isNaN(cardTools.suit(false)));
    });
    it('should return NaN when the card ID is true', function() {
      assert.isTrue(Number.isNaN(cardTools.suit(true)));
    });
    it('should return NaN when the card ID is -1', function() {
      assert.isTrue(Number.isNaN(cardTools.suit(-1)));
    });
    it('should return NaN when the card ID is 3.14', function() {
      assert.isTrue(Number.isNaN(cardTools.suit(3.14)));
    });
  });

  context('cardID function', function() {
    it('should be a function', function() {
      assert.isFunction(cardTools.cardID);
    });
    it('should return 0 when the input is (1,1)', function() {
      assert.equal(cardTools.cardID(1,1), 0);
    });
    it('should return 51 when the input is (13,4)', function() {
      assert.equal(cardTools.cardID(13,4), 51);
    });
    it('should return 30 when the input is (8,3)', function() {
      assert.equal(cardTools.cardID(8,3), 30);
    });
    it('should return NaN when the input is (0,1)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(0)), true);
    });
    it('should return NaN when the input is ("1",1)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID('1')), true);
    });
    it('should return NaN when the input is (1,5)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(1)), true);
    });
    it('should return NaN when the input is (14,1)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(14)), true);
    });
    it('should return NaN when the input is (-1,-1)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(-1)), true);
    });
    it('should return NaN when the input is (0.5,1)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(0.5)), true);
    });
    it('should return NaN when the input is (1,NaN)', function() {
      assert.isTrue(Number.isNaN(cardTools.cardID(1)), true);
    });
  });

  context('color function', function() {
    it('should be a function', function() {
      assert.isFunction(cardTools.color);
    });
    it('should return "red" when the card ID is 0', function() {
      assert.equal(cardTools.color(0), 'red');
    });
    it('should return "black" when the card ID is 2', function() {
      assert.equal(cardTools.color(2), 'black');
    });
    it('should return NaN when the card ID is "apple"', function() {
      assert.isTrue(Number.isNaN(cardTools.color("apple")));
    });
    it('should return NaN when the card ID is true', function() {
      assert.isTrue(Number.isNaN(cardTools.color(true)));
    });
    it('should return NaN when the card ID is false', function() {
      assert.isTrue(Number.isNaN(cardTools.color(false)));
    });
  });

  context('name function', function() {
    it('should be a function', function() {
      assert.isFunction(cardTools.name);
    });
    it('should return "Two of Diamonds" when the card ID is 5', function() {
      assert.equal(cardTools.name(5), 'Two of Diamonds');
    });
    it('should return "King of Clubs" when the card ID is 51', function() {
      assert.equal(cardTools.name(51), 'King of Clubs');
    });
    it('should return NaN when the card ID is -1', function() {
      assert.isTrue(Number.isNaN(cardTools.name(-1)));
    });
    it('should return NaN when the card ID is 52', function() {
      assert.isTrue(Number.isNaN(cardTools.name(52)));
    });
    it('should return NaN when the card ID is NaN', function() {
      assert.isTrue(Number.isNaN(cardTools.name(NaN)));
    });
  });

});

var assert = require('assert');
var cardTools = require('../hw3.js'); // note this means we need to export as a module

describe('cardTools object', function() {
  it('should be an object', function() {
    assert.equal(typeof(cardTools), 'object');
  });

  context('rank function', function() {
    it('should be a function', function() {
      assert.equal(typeof(cardTools.rank), 'function');
    });
    it('should return the correct rank for valid IDs', function() {
      assert.equal(cardTools.rank(0), 1);
      assert.equal(cardTools.rank(3), 1);
      assert.equal(cardTools.rank(51), 13);
    });
    it('should return NaN for invalid IDs', function() {
      assert.equal(Number.isNaN(cardTools.rank(52)), true);
      assert.equal(Number.isNaN(cardTools.rank('0')), true);
      assert.equal(Number.isNaN(cardTools.rank(-1)), true);
      assert.equal(Number.isNaN(cardTools.rank(2.5)), true);
      assert.equal(Number.isNaN(cardTools.rank(undefined)), true);
    });
  });

  context('suit function', function() {
    it('should be a function', function() {
      assert.equal(typeof(cardTools.suit), 'function');
    });
    it('should return the correct suit value for valid IDs', function() {
      assert.equal(cardTools.suit(0), 1);
      assert.equal(cardTools.suit(5), 2);
      assert.equal(cardTools.suit(0), 1);
    });
    it('should return NaN for invalid IDs', function() {
      assert.equal(Number.isNaN(cardTools.suit(52)), true);
      assert.equal(Number.isNaN(cardTools.suit(false)), true);
      assert.equal(Number.isNaN(cardTools.suit(true)), true);
      assert.equal(Number.isNaN(cardTools.suit(-1)), true);
      assert.equal(Number.isNaN(cardTools.suit(3.14)), true);
    });
  });

  context('cardID function', function() {
    it('should be a function', function() {
      assert.equal(typeof(cardTools.cardID), 'function');
    });
    it('should return the correct cardID given valid parameters', function() {
      assert.equal(cardTools.cardID(1,1), 0);
      assert.equal(cardTools.cardID(13,4), 51);
      assert.equal(cardTools.cardID(8,3), 30);
    });
    it('should return NaN when given invalid parameters', function() {
      assert.equal(Number.isNaN(cardTools.cardID(0)), true);
      assert.equal(Number.isNaN(cardTools.cardID('1')), true);
      assert.equal(Number.isNaN(cardTools.cardID(1)), true);
      assert.equal(Number.isNaN(cardTools.cardID(14)), true);
      assert.equal(Number.isNaN(cardTools.cardID(-1)), true);
      assert.equal(Number.isNaN(cardTools.cardID(0.5)), true);
      assert.equal(Number.isNaN(cardTools.cardID(1)), true);
    });
  });

  context('color function', function() {
    it('should be a function', function() {
      assert.equal(typeof(cardTools.color), 'function');
    });
    it('should return the correct color for a valid ID', function() {
      assert.equal(cardTools.color(0), 'red');
      assert.equal(cardTools.color(2), 'black');
    });
    it('should return NaN for invalid IDs', function() {
      assert.equal(Number.isNaN(cardTools.color("apple")), true);
      assert.equal(Number.isNaN(cardTools.color(true)), true);
      assert.equal(Number.isNaN(cardTools.color(false)), true);
    });
  });

  context('name function', function() {
    it('should be a function', function() {
      assert.equal(typeof(cardTools.name), 'function');
    });
    it('should return the correct card name for valid IDs', function() {
      assert.equal(cardTools.name(5), 'Two of Diamonds');
      assert.equal(cardTools.name(51), 'King of Clubs');
    });
    it('should return NaN for invalid IDs', function() {
      assert.equal(Number.isNaN(cardTools.name(-1)), true);
      assert.equal(Number.isNaN(cardTools.name(52)), true);
      assert.equal(Number.isNaN(cardTools.name(NaN)), true);
    });
  });

});

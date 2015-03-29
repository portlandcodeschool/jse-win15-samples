var makeCard = require('../hw4.js');
var chai = require('chai'); // lets us use the more verbose Chai assertion library
var assert = chai.assert;

// card instances needed for assertions:

describe('makeCard factory', function() {
  // variables must be initialized outside the before function
  var card0, card3, card5, card51;

  before( function() {
    card0 = makeCard(0);
    card3 = makeCard(3);
    card5 = makeCard(5);
    card51 = makeCard(51);
  });

  it('should be a function', function() {
    assert.isFunction(makeCard);
  });
  // the assertions can be compacted like this, with multiple in a single 'it'.
  // Note the new method here for checking non-strict falsity
  it('should validate values that are passed in', function() {
    assert.notOk(makeCard(52));
    assert.notOk(makeCard("0"));
    assert.notOk(makeCard(-1));
    assert.notOk(makeCard(false));
    assert.notOk(makeCard(true));
  });
  context('makeCard.rank', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.rank);
    });
    it('should return the correct value', function() {
      assert.equal(card0.rank(), 1);
      assert.equal(card3.rank(), 1);
      assert.equal(card51.rank(), 13);
    });
  });
  context('makeCard.suit', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.suit);
    });
    it('should return the correct value', function() {
      assert.equal(card0.suit(), 1);
      assert.equal(card5.suit(), 2);
      assert.equal(card51.suit(), 4);
    });
  });
  context('makeCard.color', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.color);
    });
    it('should return the correct color', function() {
      assert.equal(card0.color(), 'red');
      assert.equal(card51.color(), 'black');
    });
  });
  context('makeCard.name', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.cardName);
    });
    it('should return the correct name', function() {
      assert.equal(card5.name(), 'Two of Diamonds');
      assert.equal(card51.name(), 'King of Clubs');
    });
  });
  context('makeCard.isCard', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.isCard);
    });
    // you can use tests to verify the structure of your code
    it('should be a shared, not an instance, function', function() {
      assert.isUndefined(card5.isCard);
    });
    it('should return true for valid card values', function() {
      assert.isTrue(makeCard.isCard(card0));
      assert.isTrue(makeCard.isCard(card51));
    });
    it('should return a false-y value for invalid values', function() {
      assert.notOk(makeCard.isCard(0));
      assert.notOk(makeCard.isCard({}));
    });
  });
  context('makeCard.fullSet', function() {
    it('should be an array', function() {
      assert.isArray(makeCard.fullSet);
    });
    // here's a new one
    it('should have 52 items', function() {
      assert.lengthOf(makeCard.fullSet, 52);
    });
    it('should have a card object in position 0', function() {
      assert.isTrue(makeCard.isCard(makeCard.fullSet[0]));
    });
    // you will need deepEqual for objects and arrays
    it('should contain objects that match previously defined individual cards', function() {
      assert.deepEqual(makeCard.fullSet[5], card5);
      assert.deepEqual(makeCard.fullSet[51], card51);
    });
  });
  context('makeCard shared methods', function() {
    // most (all?) chai assertions have negative versions
    it('should have created two different objects for card0 and card3', function() {
      assert.notDeepEqual(card0, card3);
    });
    it('should share rank functions between different card instances', function() {
      assert.deepEqual(card0.rank, card3.rank);
    });
    it('should share suit functions between different card instances', function() {
      assert.deepEqual(card0.suit, card3.suit);
    });
    it('should share name functions between different card instances', function() {
      assert.deepEqual(card0.name, card3.name);
    });
  });
});

/* jshint expr: true */ //because jshint doesn't like some of this syntax

// This example illustrates the bdd-style expect function for testing.
// There is also a should function for bdd-style testing, but it has 
// some potential issues, and in particular doesn't play well with IE.
// Feel free to check it out on your own, though!

var makeCard = require('../hw5.js');
var chai = require('chai');
var expect = chai.expect;

describe('makeCard', function() {
  var card0, card3, card5, card51;

  before( function() {
    card0 = makeCard(0);
    card3 = makeCard(3);
    card5 = makeCard(5);
    card51 = makeCard(51);
  });

  it('should be a function', function() {
    expect(makeCard).to.be.a('function');
  });
  it('should return a false-y value when passed an invalid ID', function() {
    expect(makeCard(52)).to.not.be.ok;
    expect(makeCard("0")).to.not.be.ok;
    expect(makeCard(-1)).to.not.be.ok;
    expect(makeCard(false)).to.not.be.ok;
    expect(makeCard(true)).to.not.be.ok;
  });
  describe('makeCard.rank', function() {
    it('should be in an IIFE and therefore inaccessible', function() {
      expect(makeCard.rank).to.not.exist;
    });
    it('should return the correct rank for a valid ID', function() {
      expect(card0.rank()).to.equal(1);
      expect(card3.rank()).to.equal(1);
      expect(card51.rank()).to.equal(13);
    });
  });
  describe('makeCard.suit', function() {
    it('should be in an IIFE and therefore inaccessible', function() {
      expect(makeCard.suit).to.not.exist;
    });
    it('should return the correct suit for a valid ID', function() {
      expect(card0.suit()).to.equal(1);
      expect(card5.suit()).to.equal(2);
      expect(card51.suit()).to.equal(4);
    });
  });
  describe('makeCard.color', function() {
    it('should be in an IIFE and therefore inaccessible', function() {
      expect(makeCard.color).to.not.exist;
    });
    it('should return the proper color for a valid ID', function() {
      expect(card0.color()).to.equal('red');
      expect(card51.color()).to.equal('black');
    });
  });
  describe('makeCard.name', function() {
    it('should be in an IIFE and therefore inaccessible', function() {
      expect(makeCard.cardName).to.not.exist;
    });
    it('should return the proper name for a valid ID', function() {
      expect(card5.name()).to.equal('Two of Diamonds');
      expect(card51.name()).to.equal('King of Clubs');
    });
  });
  describe('makeCard.isCard', function() {
    it('should be a function', function() {
      expect(makeCard.isCard).to.be.a('function');
    });
    it('should be a shared, not an instance, function', function() {
      expect(card5.isCard).to.not.exist;
    });
    it('should return true for valid card IDs', function() {
      expect(makeCard.isCard(card0)).to.be.true;
      expect(makeCard.isCard(card51)).to.be.true;
    });
    it('should return a false-y value for invalid IDs', function() {
      expect(makeCard.isCard(0)).to.not.be.ok;
      expect(makeCard.isCard({})).to.not.be.ok;
    });
  });
  describe('makeCard.fullSet', function() {
    it('should be an array', function() {
      expect(makeCard.fullSet).to.be.an('array');
    });
    it('should have 52 items', function() {
      expect(makeCard.fullSet).to.have.length(52);
    });
    it('should have a card object in position 0', function() {
      var firstCard = makeCard.fullSet[0];
      expect(makeCard.isCard(firstCard)).to.be.true;
    });
    it('should contain objects that match previously defined individual cards', function() {
      expect(makeCard.fullSet[5]).to.deep.equal(card5);
      expect(makeCard.fullSet[51]).to.deep.equal(card51);
    });
  });
  describe('makeCard shared methods', function() {
    it('should have created two different objects for card0 and card3', function() {
      expect(card0).to.not.deep.equal(card3);
    });
    it('should share functions between different card instances', function() {
      expect(card0.rank).to.deep.equal(card3.rank);
      expect(card0.suit).to.be.deep.equal(card3.suit);
      expect(card0.name).to.be.deep.equal(card3.name);
    });
  });
});

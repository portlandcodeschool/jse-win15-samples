try {
  var Card = require('../hw6.js');
  var chai = require('chai');
} catch(err) {}
var expect = chai.expect;

// card instances needed for assertions:
describe('Card constructor', function() {
  var card0, card3, card5, card51, card52;

  before(function() {
    card0 = new Card(0);
    card3 = new Card(3);
    card5 = new Card(5);
    card51 = new Card(51);
    card52 = new Card(52);
  });

  it('should be a function', function() {
    expect(Card).to.be.a('function');
  });
  it('should return a Card object that responds to Card methods', function() {
    expect(card0).to.respondTo('rank');
    expect(card0).to.respondTo('suit');
    expect(card0).to.respondTo('color');
    expect(card0).to.respondTo('name');
    expect(card0).to.respondTo('isValid');
    expect(new Card(0)).to.be.an.instanceof(Card);
  });

  describe('card instance', function() {
    context('card rank', function() {
      it('should be a function', function() {
        expect(card0.rank).to.be.a('function');
      });
      it('should return the card\'s rank value when called', function() {
        expect(card0.rank()).to.equal(1);
        expect(card3.rank()).to.equal(1);
        expect(card5.rank()).to.equal(2);
        expect(card51.rank()).to.equal(13);
      });
    });
    context('card color', function() {
      it('should be a function', function() {
        expect(card0.color).to.be.a('function');
      });
      it('should return the card\'s color value when called', function() {
        expect(card0.color()).to.equal('red');
        expect(card3.color()).to.equal('black');
        expect(card5.color()).to.equal('red');
        expect(card51.color()).to.equal('black');
      });
    });
    context('card suit', function() {
      it('should be a function', function() {
        expect(card0.suit).to.be.a('function');
      });
      it('should return the card\'s suit value when called', function() {
        expect(card0.suit()).to.equal(1);
        expect(card3.suit()).to.equal(4);
        expect(card5.suit()).to.equal(2);
        expect(card51.suit()).to.equal(4);
      });
    });
    context('card name', function() {
      it('should be a function', function() {
        expect(card0.name).to.be.a('function');
      });
      it('should return the card\'s name value when called', function() {
        expect(card0.name()).to.equal('Ace of Hearts');
        expect(card3.name()).to.equal('Ace of Clubs');
        expect(card5.name()).to.equal('Two of Diamonds');
        expect(card51.name()).to.equal('King of Clubs');
      });
    });
    context('card isValid', function() {
      it('should be a function', function() {
        expect(card0.isValid).to.be.a('function');
      });
      it('should return true for valid cards', function() {
        expect(card0.isValid()).to.be.true;
        expect(card3.isValid()).to.be.true;
        expect(card5.isValid()).to.be.true;
        expect(card51.isValid()).to.be.true;
      });
      it('should return a false-y value for invalid cards', function() {
        expect(new Card(52).isValid()).to.not.be.ok;
        expect(new Card(NaN).isValid()).to.not.be.ok;
        expect(new Card('cat').isValid()).to.not.be.ok;
        expect(new Card(false).isValid()).to.not.be.ok;
      });
    });
  });
});
// invalid when tested
// 
// // Test instance methods:
// assert(card0.rank()===1,  "Test 1 failed");
// assert(card3.rank()===1,  "Test 2 failed");
// assert(card51.rank()===13,"Test 3 failed");
// assert(card0.suit()===1,  "Test 4 failed");
// assert(card5.suit()===2,  "Test 5 failed");
// assert(card51.suit()===4, "Test 6 failed");
// assert(card0.color()==='red',   "Test 10 failed");
// assert(card3.color()==='black', "Test 11 failed");
// assert(card5.name()==='Two of Diamonds', "Test 12 failed");
// assert(card51.name()==='King of Clubs',  "Test 13 failed");
// 
// assert(card0.isValid(),		"Test 15 failed");
// assert(card51.isValid(),	"Test 16 failed");
// assert(!card52.isValid(),	"Test 17 failed");
// 
// // Test Card.isCard:
// assert(Card.isCard(card0),  "Test 21 failed");
// assert(Card.isCard(card51), "Test 22 failed");
// assert(!Card.isCard(0),     "Test 23 failed");
// assert(!Card.isCard({}),    "Test 24 failed");
// assert(!Card.isCard(card52),"Test 25 failed");

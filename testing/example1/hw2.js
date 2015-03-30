// In this example, we're using only a slight variation on the original solution to
// homework 2's cards problem. The assertions are included at the bottom of this
// file, and will run from the command line with 'mocha hw2.js' assuming you are
// in the directory containing this file. The main difference is that instead of
// writing our own 'assert' function, we're using Node's built-in 'assert' library.

// Helper function:
function isValid(num,low,high) { // Returns--> NaN, true
    if ((typeof num)!="number") //wrong type
        return NaN;
    if (num%1 !== 0) //non-integer
        return NaN;
    if (num<low || num>high) //out of range
        return NaN;
    return true;
}

// Card features:
function rank(card) { // --> 1..13, NaN
    return isValid(card,0,51) &&
        Math.floor(card/4)+1;
}

function suit(card) { // --> 1..4, NaN
    return isValid(card,0,51) &&
        ((card%4)+1);
}

function cardID(rank,suit) { // --> 0..51, NaN
    return isValid(rank,1,13) &&
            isValid(suit,1,4) &&
            ((rank-1)*4 + (suit-1));
}
function color(card) { // -->"red,"black",NaN
    var theSuit=suit(card); //may be NaN
    return theSuit && ((theSuit<3)? "red": "black");
}

// Both arrays are padded with an unused value ('' but could be anything) in the first position,
// so that all the other values can be found at the corresponding index (i.e. rankNames[2] is "Two").
var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'];
var suitNames = ['','Hearts','Diamonds','Spade','Clubs'];

function name(card) { //--> string, NaN
    var theRank = rank(card);
    var theSuit = suit(card);
    return theRank && theSuit && //if those are okay...
        (rankNames[theRank]+' of '+suitNames[theSuit]);//build the name string
}

// begin tests

var assert = require('assert');
describe('rank', function() {
  it('should be a function', function() {
    assert.equal(typeof(rank), 'function');
  });
  it('should return 1 when the card ID is 0', function() {
    assert.equal(rank(0), 1);
  });
  it('should return 1 when the card ID is 3', function() {
    assert.equal(rank(3), 1);
  });
  it('should return 13 when the card ID is 51', function() {
    assert.equal(rank(51), 13);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(Number.isNaN(rank(52)), true);
  });
  it('should return NaN when the card ID is "0"', function() {
    assert.equal(Number.isNaN(rank('0')), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(Number.isNaN(rank(-1)), true);
  });
  it('should return NaN when the card ID is 2.5', function() {
    assert.equal(Number.isNaN(rank(2.5)), true);
  });
  it('should return NaN when the card ID is undefined', function() {
    assert.equal(Number.isNaN(rank(undefined)), true);
  });
});

describe('suit', function() {
  it('should be a function', function() {
    assert.equal(typeof(suit), 'function');
  });
  it('should return 1 when the card ID is 0', function() {
    assert.equal(suit(0), 1);
  });
  it('should return 2 when the card ID is 5', function() {
    assert.equal(suit(5), 2);
  });
  it('should return 4 when the card ID is 51', function() {
    assert.equal(suit(0), 1);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(Number.isNaN(suit(52)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(Number.isNaN(suit(false)), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(Number.isNaN(suit(true)), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(Number.isNaN(suit(-1)), true);
  });
  it('should return NaN when the card ID is 3.14', function() {
    assert.equal(Number.isNaN(suit(3.14)), true);
  });
});

describe('cardID', function() {
  it('should be a function', function() {
    assert.equal(typeof(cardID), 'function');
  });
  it('should return 0 when the input is (1,1)', function() {
    assert.equal(cardID(1,1), 0);
  });
  it('should return 51 when the input is (13,4)', function() {
    assert.equal(cardID(13,4), 51);
  });
  it('should return 30 when the input is (8,3)', function() {
    assert.equal(cardID(8,3), 30);
  });
  it('should return NaN when the input is (0,1)', function() {
    assert.equal(Number.isNaN(cardID(0,1)), true);
  });
  it('should return NaN when the input is ("1",1)', function() {
    assert.equal(Number.isNaN(cardID('1',1)), true);
  });
  it('should return NaN when the input is (1,5)', function() {
    assert.equal(Number.isNaN(cardID(1,5)), true);
  });
  it('should return NaN when the input is (14,1)', function() {
    assert.equal(Number.isNaN(cardID(14,1)), true);
  });
  it('should return NaN when the input is (-1,-1)', function() {
    assert.equal(Number.isNaN(cardID(-1,-1)), true);
  });
  it('should return NaN when the input is (0.5,1)', function() {
    assert.equal(Number.isNaN(cardID(0.5,1)), true);
  });
  it('should return NaN when the input is (1,NaN)', function() {
    assert.equal(Number.isNaN(cardID(1,NaN)), true);
  });
});

describe('color', function() {
  it('should be a function', function() {
    assert.equal(typeof(color), 'function');
  });
  it('should return "red" when the color is 0', function() {
    assert.equal(color(0), 'red');
  });
  it('should return "black" when the color is 2', function() {
    assert.equal(color(2), 'black');
  });
  it('should return NaN when the card ID is "apple"', function() {
    assert.equal(Number.isNaN(color("apple")), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(Number.isNaN(color(true)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(Number.isNaN(color(false)), true);
  });
});

describe('name', function() {
  it('should be a function', function() {
    assert.equal(typeof(name), 'function');
  });
  it('should return "Two of Diamonds" when the cardID is 5', function() {
    assert.equal(name(5), 'Two of Diamonds');
  });
  it('should return "King of Clubs" when the cardID is 51', function() {
    assert.equal(name(51), 'King of Clubs');
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(Number.isNaN(name(-1)), true);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(Number.isNaN(name(52)), true);
  });
  it('should return NaN when the card ID is NaN', function() {
    assert.equal(Number.isNaN(name(NaN)), true);
  });
});

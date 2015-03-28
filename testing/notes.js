function rank() {
  //
}
function suit() {
  //
}
function cardID() {
  //
}
function color() {
  //
}
function name() {
  //
}

/*

Advantages of unit testing (and testing in general):
* by writing tests first, you will be forced to think about the structure
  of your program before you start coding
* If you know you will be testing, you will write code that is easy to test:
  lots of small, independent methods. This is what object oriented coding
  is all about.
* Testing will save you a ton of time in the long run, as you can be sure
  that your future changes haven't broken anything simply by running your tests.

Mocha is a test framework. It basically just runs tests for you the language
of the tests is not something it concerns itself with. It handles reporting
and takes care of some stuff like asynchronous tests and whatnot. You install
it with npm install -g mocha

Chai is an assertion library. It defines the syntax for how tests should be
written. There are plenty of other assertion libraries out there--for example,
Node's assert module, which comes standard. Chai has lots more options for 
syntax, though.

The most basic way to run mocha is with Node's assert module:
var assert = require('assert');
This gives access to a few assert methods. It's not everything you'll want,
but it's a reasonable place to start and doesn't require installing 
anything extra, since assert is built in to Node. The methods that come with it:

assert.fail(actual, expected, message, operator)
assert(value[, message]), assert.ok(value[, message])
assert.equal(actual, expected[, message])
assert.notEqual(actual, expected[, message])
assert.deepEqual(actual, expected[, message])
assert.notDeepEqual(actual, expected[, message])
assert.strictEqual(actual, expected[, message])
assert.notStrictEqual(actual, expected[, message])
assert.throws(block[, error][, message])
assert.doesNotThrow(block[, message])
assert.ifError(value) (this is good for testing callback err params)

The easiest way to use mocha is to simply write the tests in the file you're
testing, and put it in a subdirectory called 'test'. This is where mocha will
look for tests by default. 

Diversion into basic Node & the package.json file:
Mocha (and Chai, and so on) should be declared as devDependencies rather than
just regular Dependencies. Those will be installed by npm install if there's a
package.json file in your directory, but not if you're installing remotely
with npm install <module_name> unless you use the --dev option.

As a side note, name and version are the only two properties required in the
package.json file.

Karma is an automated test-runner--you start it, it will run tests using all
browsers you have specified and continue to watch your code, rerunning tests
on changes.
*/
var assert = require('assert');
describe('rank', function() {
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
    assert.equal(isNaN(rank(52)), true);
  });
  it('should return NaN when the card ID is "0"', function() {
    assert.equal(isNaN(rank('0')), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(rank(-1)), true);
  });
  it('should return NaN when the card ID is 2.5', function() {
    assert.equal(isNaN(rank(2.5)), true);
  });
  it('should return NaN when the card ID is undefined', function() {
    assert.equal(isNaN(rank(undefined)), true);
  });
});

describe('suit', function() {
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
    assert.equal(isNaN(suit(52)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(isNaN(suit(false)), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(isNaN(suit(true)), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(suit(-1)), true);
  });
  it('should return NaN when the card ID is 3.14', function() {
    assert.equal(isNaN(suit(3.14)), true);
  });
});

describe('cardID', function() {
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
    assert.equal(isNaN(cardID(0,1)), true);
  });
  it('should return NaN when the input is ("1",1)', function() {
    assert.equal(isNaN(cardID('1',1)), true);
  });
  it('should return NaN when the input is (1,5)', function() {
    assert.equal(isNaN(cardID(1,5)), true);
  });
  it('should return NaN when the input is (14,1)', function() {
    assert.equal(isNaN(cardID(14,1)), true);
  });
  it('should return NaN when the input is (-1,-1)', function() {
    assert.equal(isNaN(cardID(-1,-1)), true);
  });
  it('should return NaN when the input is (0.5,1)', function() {
    assert.equal(isNaN(cardID(0.5,1)), true);
  });
  it('should return NaN when the input is (1,NaN)', function() {
    assert.equal(isNaN(cardID(1,NaN)), true);
  });
});

describe('color', function() {
  it('should return "red" when the color is 0', function() {
    assert.equal(color(0), 'red');
  });
  it('should return "black" when the color is 2', function() {
    assert.equal(color(2), 'black');
  });
  it('should return NaN when the card ID is "apple"', function() {
    assert.equal(isNaN(color("apple")), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(isNaN(color(true)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(isNaN(color(false)), true);
  });
});

describe('name', function() {
  it('should return "Two of Diamonds" when the cardID is 5', function() {
    assert.equal(name(5), 'Two of Diamonds');
  });
  it('should return "King of Clubs" when the cardID is 51', function() {
    assert.equal(name(51), 'King of Clubs');
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(name(-1)), true);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(isNaN(name(52)), true);
  });
  it('should return NaN when the card ID is NaN', function() {
    assert.equal(isNaN(name(NaN)), true);
  });
});

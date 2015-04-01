var Card = (function(){

  function Ctor(id) {
    this.id = id;
  }
  var numCards = 52;

  var proto = Ctor.prototype;

  // Instance methods (shared via prototype):
  proto.isValid = function() {
    return ((typeof this.id)==="number")//correct type
  && (this.id%1 === 0)  //integer
  && (this.id >=0)  // non-negative
  && (this.id < this.constructor.numCards()); //in range for card type
  };

  proto.rank = function() {
    return Math.floor(this.id/4)+1;
  };
  proto.suit = function() {
    return (this.id%4)+1;
  };
  proto.color = function() {
    var suitVal=this.suit();
    return suitVal && ((suitVal<3)? "red": "black");
  };
  proto.name = function() {
    var rankVal = this.rank();
    var suitVal = this.suit();
    return rankVal && suitVal &&
      (this.constructor.rankNames()[rankVal-1]
       +' of '		//-1 b/c no leading blank in arrays
       +this.constructor.suitNames()[suitVal-1]);
  };

  // Private data:

  // The leading blank element is now gone from both arrays:	
  var suitNames = ['Hearts','Diamonds','Spades','Clubs'];

  var rankNames = ['Ace','Two','Three','Four','Five','Six','Seven',
      'Eight','Nine','Ten','Jack','Queen','King'];

  var fullSet = [];
  for (var i=0; i<numCards; ++i) {
    fullSet.push(Ctor(i));
  }

  // Class methods:

  Ctor.isCard = function(thing) {
    return (thing.constructor === this)
      && thing.isValid();
  };

  Ctor.rankNames = function() {
    return rankNames.slice();
  };
  Ctor.suitNames = function() {
    return suitNames.slice();
  };
  Ctor.numCards = function() {
    return numCards;
  };

  // Return constructor:
  return Ctor;
})(); //end superclass IIFE

if (typeof module !== "undefined") {
  module.exports = Card;
}

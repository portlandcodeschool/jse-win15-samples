function makeCard(id) {
  // If id is invalid (out of range, etc)
  if (!makeCard.isValidID(id)) // abort if id is invalid
    return null;

  // Otherwise build an instance object with an id property,
  // representing one card, and attach to it four methods:
  //   rank()
  //   suit()
  //   color()
  //   name()
  // Each method property should be just a link to the corresponding method
  //  of the factory itself.

  return {id:id,
    rank : makeCard.rank,
    suit : makeCard.suit,
    color: makeCard.color,
    name : makeCard.cardName
      //NOTE: functions (including this factory) have a built-in property 'name',
      //so we need a different key (e.g. cardName) for the factory method
  }
}

//-----------------------------
// Methods called though instances (where 'this' means the instance):
//-----------------------------

makeCard.rank = function() { // --> 1..13, NaN
  return Math.floor(this.id/4)+1;
};

makeCard.suit = function() { // --> 1..4, NaN
  return (this.id%4)+1;
};

makeCard.color = function() { // -->"red,"black",NaN
  var suit=this.suit();
  return suit && ((suit<3)? "red": "black");
};

makeCard.rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
  'Jack','Queen','King'];
makeCard.suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

makeCard.cardName = function() { //--> string, NaN
  // This method can't have the key 'name' within the makeCard function,
  // but instance objects can store a reference to it called 'name'
  var rank = this.rank();
  var suit = this.suit();
  return rank && suit && (makeCard.rankNames[rank]+' of '+makeCard.suitNames[suit]);
};


//-----------------------
// Methods to be called through factory only:
//-----------------------

makeCard.isValidID = function(num) { // Returns--> true, false
  return ((typeof num)==="number") //correct type
    && (num%1 === 0)        //integer
    && num>=0 && num<=51;   //in range
}

makeCard.isCard = function(thing) { // --> true,false
  // return true if thing is a valid card instance made by this factory
  return thing
    && (typeof thing === 'object') // check for null or primitive
    && (thing.name === makeCard.cardName) // check at least one method
    && ('id' in thing) && makeCard.isValidID(thing.id); //check id
}

//---------------------
// Additional factory properties
//---------------------

makeCard.fullSet = [];
for (var id=0; id<52; ++id) {
  makeCard.fullSet.push(makeCard(id));
}

module.exports=makeCard;

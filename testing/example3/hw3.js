module.exports = { // required to export for testing!
  // a toolbox object used to group related methods
  //  ^^^^^^^^^could be called anything


  // These functions are no longer global variables but instead
  // properties (methods) of the toolbox object:
  rank: function(id) { // --> 1..13, NaN
    return this.isValid(id,0,51) &&
      Math.floor(id/4)+1;
  },

  suit: function(id) { // --> 1..4, NaN
    return this.isValid(id,0,51) &&
      (id%4)+1;
  },

  cardID: function(rank,suit) { // --> 0..51, NaN
    return  this.isValid(rank,1,13) &&
      this.isValid(suit,1,4) &&
      ((rank-1)*4 + (suit-1));
  },

  color: function(id) { // -->"red,"black",NaN
    var suit=this.suit(id);
    return suit && ((suit<3)? "red": "black");
  },

  name: function(id) { //--> string, NaN
    var rank = this.rank(id);
    var suit = this.suit(id);
    return rank && suit && (this.rankNames[rank]+' of '+this.suitNames[suit]);
  },

  // possibly other methods and properties, if needed, including...
  // a validation function?
  isValid: function(num,low,high) { // Returns--> NaN, true
    if ((typeof num)!="number") //wrong type
      return NaN;
    if (num%1 !== 0) //non-integer
      return NaN;
    if (num<low || num>high) //out of range
      return NaN;
    return true;
  },

  // some arrays?
  rankNames: ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
  'Jack','Queen','King'],
  suitNames: ['','Hearts','Diamonds','Spades','Clubs']

}; // end cardTools definition

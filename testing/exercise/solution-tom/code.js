module.exports = {

  register: 0,
  account: 0,
  stock: {},
  sellBeer: function( number, type, price ) {
    this.stock[type] -= number;
    this.register += price;
  },
  getBeer: function( beers, cost ) {
    this.account -= cost;
    console.log(this.stock);
    for (var beer in beers) {
      if (this.stock[beer]) {
        this.stock[beer] += beers[beer];
      } else {
        this.stock[beer] = beers[beer];
      }
    }
    console.log(this.stock);
  },
  breakage: function( type, number ) {
    this.stock[type] -= number;
  },

};

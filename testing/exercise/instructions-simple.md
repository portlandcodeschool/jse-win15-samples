Assume a bar instance can be constructed like this:

`var bar = new Bar();`

Assume a bar instance has these methods:

`bar.serve(beerName,bottles)`:
 returns num of bottles actually served, which may be less than `bottles` if stock is low.

`bar.restock(beerName,bottles)`:
returns num of bottles actually restocked, which may be less than `bottles` if cash is low.

`bar.beerNames()`:
return array of all known beer names, in stock or otherwise

`bar.supply(beerName)`:
returns num of bottles of `beerName` currently in stock

`bar.cash()`:
return number of dollars in register

`bar.tip(dollars)`:
add dollars to register

`bar.price()`: return dollars brought in for each bottle served

`bar.cost()`: return dollars spent for each bottle restocked



Tests for these methods should include:

bar.restock:
"Restocks no more than cash affords"
"Raises supply by restocked amount"
"Lowers cash by restocking cost"

bar.serve:
"Serves no more than supply allows"
"Raises cash by servings times price"
"Lowers supply by amount served"
"Changes nothing if beer name is unknown"

bar.tip:
"Raises cash by amount tipped"


Your tests should assume nothing about a bar's
current cash, supplies, price, and cost;
those details are only determined by constructor Bar().


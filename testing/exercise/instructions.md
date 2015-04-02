#Instructions

This exercise is structured as a repeating cycle: first, you will write some tests, and then you will write code that passes those tests. Make sure you do it in that order! No fair cheating and writing working code first, then writing the tests after the fact.

Later phases will build on the tests and code that you have already written, so you will slowly build up a library of tests to ensure proper behavior and code that passes all those tests. Use Mocha and whatever assertion style and library you like, but be sure to split the tests and the code into (at least) two different files. Feel free to use the files in the exercises as templates to get started. Be sure to provide at least a couple of different test-cases for each individual test.

##Coding at the bar


You're going to write an inventory-tracking application for a friend who owns a bar and needs to keep track of beer stock. Since you are being paid in beer, starting with tests is probably a good idea--errors seem to crop up more frequently after a pint or two, for some reason.

The system should track the number of bottles of each type of beer the bar sells. Any given transaction will either add to or subtract from the number of bottles of a particular beer in stock, and usually change financial assets as well.

How exactly you implement this is up to you; the important part is that the beers should be able to be identified in some way and should have a number in stock associated with them. One simple structure would be to have a single stock object with key/value pairs for beer and number in stock, like so:

```
var stock = { burnside_oatmeal_pale: 8,
              pliny_the_elder: 3
            }
```

You'll also need to somehow represent money, which is earned by serving beer and spent on re-ordering it.  You can decide whether to set buying and selling prices per bottle, or just record the total cashflow with each transaction.

**TIP:** Since floating point numbers can behave in weird ways some times, it may be awkward to represent dollars and cents.  Feel free to simplify by using integer currency values (and pretend it's in pesos or yen).

## Phase 1: API

Propose an API for your application, i.e. a set of functions which are called to represent transactions and inspect values.
Write down the "signatures" (names and parameters) of the functions you think you'll need.


## Phase 2: Basic tests

Write an initial round of testing which ensures that:

1. serving beer removes the requested number of bottles from the stock and adds the appropriate amount of money to the register.

2. restocking beer adds the requested number of bottles to the stock and removes the appropriate amount of money.


## Phase 3: Basic functionality

Once those tests are written, go ahead and write the minimum amount of code required to make the tests pass. Remember that one of the main principles of test-driven development is to avoid writing more code than you need to!


## Phase 4: More tests

Begin to consider what can go wrong-- for example, there may not be enough money or beer in stock to satisfy a request, or arguments provided to functions may have the wrong type or invalid values.

Add some tests which detect such failures and ensure a reasonable response.  You'll have to decide what that is!
For example, you might decide that any improper arguments or unsatisfiable requests simply do nothing and return a falsey value, and that successful requests always return a truthy value.


## Phase 5: More functionality

Improve your application code so that it passes those new tests.

As time allows, keep cycling back and forth between writing new tests and writing code to satisfy them.



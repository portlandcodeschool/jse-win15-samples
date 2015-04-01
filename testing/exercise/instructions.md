#Instructions

This exercise is divided into multiple sections. First, you will write some tests, and then you will write code that passes those tests. Make sure you do it in that order! No fair cheating and writing working code first, then writing the tests after the fact. Subesquent sections will build on the tests and code that you have already written, so you will slowly build up a library of tests to ensure proper behavior and code that passes all those tests. Use Mocha and whatever assertion style and library you like, but be sure to split the tests and the code into (at least) two different files--this will require a package.json file with (at minimum) mocha in the devDependencies. Feel free to use the files in the exercises as templates to get started. Be sure to provide at least a couple of different test-cases for each individual test. You can work on your own or in a group.

##Coding at the bar

Imagine that a friend of yours owns a bar, and they need a way to keep track of beer stock. Being a kind person, you have offered up your mad JavaScript skills to help deal with this problem: you are going to write an inventory tracker. Since you are being paid in beer, starting with tests is probably a good idea--errors seem to crop up more frequently after a pint or two, for some reason.

The system should track the number of bottles of each type of beer the bar sells. Any given transaction will either add to or subtract from the number of bottles of a particular beer in stock. How exactly you implement this is up to you; the important part is that the beers should be able to be identified in some way and should have a number in stock associated with them. One simple structure would be to have a single stock object with key/value pairs for beer and number in stock, like so:

```
var stock = { burnside_oatmeal_pale: 8,
              pliny_the_elder: 3
            }
```

There should also be two variables representing the amount of money in the register and the amount of money in the purchasing account. When someone buys a beer, the appropriate number of bottles should come out of the stock, and the money paid should go into the register. When a new shipment comes in, there should be a `receiveShipment` function that pays for the order out of the purchasing account and puts the delivered beer into the stock. Finally, if the unfortunate occurs and somebody breaks a bottle, there should be a `breakage` method that removes a bottle from the stock without adding any money. **TIP:** Since floating point numbers can behave in weird ways some times, you should record prices in cents, rather than in dollars and cents (ie 495 instead of 4.95 for four dollars and ninety-five cents).

The initial round of testing should ensure that:

1. receiving a shipment adds the supplied number of beers to the stock and removes the supplied amount of money from the purchasing account.
2. selling a beer removes the supplied number of beers from the stock and adds the supplied amount of money to the register.
3. breaking a bottle removes the supplied number of bottles from the stock and without changing either the register or the purchasing account.

Each of the three ways of interacting with stock and money should be a function: no touching the variables directly! For now, we can assume that is good enough for security, though if your friend keeps giving you beer for coding, who knows? Once those tests are written, go ahead and write the minimum amount of code required to make the tests pass. Remember that one of the main principles of test-driven development is to not write more code than you need to!

##Validating inputs

The next day brings problems! Something has gone wrong with the register tracker, and it is showing far more money than should be in there. Also, the purchasing account looks like it just got charged a minimal amount, and seems to have fractions of cents left over. After a little asking around, you are able to hunt down the problems: User error. Time to go home.

Well, except that this is for your friend, and there is free beer in it for you. All you need to do is add in some code to keep the bartender from entering prices in quote (thus turning them into strings and adding far too much money to the register) and to verify that when shipments are received, the money is entered as a whole number of cents rather than as dollars and cents. Some kind of price verification helper function is probably a reasonable way to go. Finally, since having negative beer is not an option you will have to keep the bartenders from selling more beer than the bar has. From the point of view of the tests, the important part is that:

1. Entering anything other than a number (or entering NaN) should return some false-y value
2. Entering a number in dollars and cents should automatically convert that to a whole number of cents
3. Attempting to sell (or break) more beers than the bar has should return some false-y value

Once those tests are written, go ahead and write the code to make them pass. Make sure that all the previous tests still pass!

##Additional security

More problems: It seems that some unscrupulous code-ninja has found that it is not too difficult to reduce the number of beers that the stock knows about, meaning that the unaccounted-for beer can be taken without anyone realizing it! The first step to good security, of course, is locking away your stock items and your money counts so that the only way to access them is through the methods already there, and also three new methods: one to report the amount of money in the register, one to do the same for the purchase account, and one to report the stock. To make these changes, you will probably have to modify your existing tests a little bit, by making the existing functions methods of an object that all have access to a closure containing the secured information.

1. Some sort of factory-type function should create a new object that has access to hidden variables for the stock and the two monetary accounts.
2. When the new object is created, it should accept a stock object representing what it has in stock and two values for each of the accounts.
3. The report functions for the register and the purchase account should correctly report the amount of money in the account.
4. The report function for the stock should give a list detailing each beer and the number in stock.

Again, be sure to write the new tests first, then test the code. If the structure of your code has changed, the original tests will probably fail--check out the way in which they fail, and if necessary make minimal changes to the tests so that they pass.

##Remembering what happened

Over a beer, your friend mentions that as great as the new system is, it would also be good to have some kind of a log of what changes happen when. That way, if the numbers seem to be off, people could look through the records and see when various changes occurred to try to find the problem. The log should include the time and date of the transaction, list what kind of transaction (sale, purchase, breakage) it is, and give any details (amount purchased and for what price, number broken, etc). It should be readable, but like the rest of the hidden-away information, should not be able to be directly changed.

1. The log should record and display the required information
2. Making a transaction should make a new entry in the log with all the required information
3. Making the log entry should not interfere with the other functions
4. The log should not be able to be directly accessed

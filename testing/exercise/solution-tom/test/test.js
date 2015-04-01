var chai = require('chai');
var assert = chai.assert;
var bar = require('../code.js');

describe('the bar', function() {
  before( function() {
    bar.register = 25000;
    bar.account = 500000;
    bar.stock = { duff: 25 };
  });
  context('selling a beer', function() {
    it('should use a function', function() {
      assert.isFunction(bar.sellBeer);
    });
    it('should remove the beers from the stock', function() {
      bar.sellBeer(2, 'duff', 1000);
      assert.deepEqual(bar.stock, { duff: 23 });
    });
    it('should add money to the register', function() {
      assert.equal(bar.register, 26000);
    });
  });
  context('receiving a shipment', function() {
    it('should use a function', function() {
      assert.isFunction(bar.getBeer);
    });
    it('should increase the amount of beer in stock', function() {
      bar.getBeer( { duff: 10, burnside_oatmeal_pale: 5 }, 4500 );
      assert.deepEqual(bar.stock, { duff: 33, burnside_oatmeal_pale: 5});
    });
    it('should remove money from the purchase account', function() {
      assert.equal(bar.account, 495500);
    });
  });
  context('breaking a bottle', function() {
    it('should use a function', function() {
      assert.isFunction(bar.breakage);
    });
    it('should reduce the number of beers in stock', function() {
      bar.breakage('duff', 1);
      assert.deepEqual(bar.stock, { duff: 32, burnside_oatmeal_pale: 5 });
    });
  });
});

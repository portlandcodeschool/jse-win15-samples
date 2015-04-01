/* jshint expr: true */ //because jshint doesn't like some of this syntax

// This example illustrates the bdd-style expect function for testing.
// There is also a should function for bdd-style testing, but it has 
// some potential issues, and in particular doesn't play well with IE.
// Feel free to check it out on your own, though!

try {
describe('makeCard rendering', function() {
  var card0, card3, card5, card51;
  var display = document.getElementById('rendering');

  before( function() {
    card0 = makeCard(0);
    card3 = makeCard(3);
    card5 = makeCard(5);
    card51 = makeCard(51);

    card0.renderText(display);
    card3.renderText(display);
    card5.renderText(display);
    card51.renderText(display);

    card0.renderImage(display);
    card3.renderImage(display);
    card5.renderImage(display);
    card51.renderImage(display);
  });


  function ensureColor(elem,colorName) {
    expect(window.getComputedStyle(elem).color).to.equal(rgbStrings[colorName]);
  }
  var rgbStrings = {
    red: 'rgb(255, 0, 0)',
    black:'rgb(0, 0, 0)'
  }

  describe('makeCard.renderText', function() {
    it('should display the short name of the card', function() {
      expect(display.textContent).to.equal('AHAC2DKC');
    });
    it('should color the text red or black', function() {
      var elems = display.children;
      ensureColor(elems[0],'red');
      ensureColor(elems[1],'black');
      ensureColor(elems[2],'red');
      ensureColor(elems[3],'black');
    });
  });

  describe('makeCard.renderImage', function() {
    it('should display an image for the card', function(done) {
        var elems = display.children;

        function verifyImage(evt) {
          expect(evt.target.complete).to.be.true;
          done();
        }

        elems[4].addEventListener('load', verifyImage);
        elems[5].addEventListener('load', verifyImage);
        elems[6].addEventListener('load', verifyImage);
        elems[7].addEventListener('load', verifyImage);
    })
  });


});
} catch (err) {}

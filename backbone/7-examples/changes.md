1: Draw board only, no BB

2: Add BB view for each square

3: Add BB view for entire board

---

4: Add checkers collection, no rendering yet

5: Add method: checkers.move(from,to)

---

6: Add render methods for both board and square views; render initial board

6b: Make board view re-render automatically whenever any checker moves
(Hint: listen for collection changes on property 'sq')

Demo: `game.move(1,9)`


7: Improve efficiency:
change `board.render(model)` so that if a model argument is provided,
re-render only its old and new positions (views)

7b: Improve efficiency:
change `square.render(model)` so that if a model argument is provided, don't bother searching for one.

8: Add click to make checkers move forward one square, plus `checkers.forward()`method.

---

9: Add chessmen as alternative to checkers

10: Add method: `board.changeGame(game)` which switches to game (a collection) and re-renders the board.

10b: Restructure views:
square view no longer links directly to game; instead it links upward to board, and finds game through that link


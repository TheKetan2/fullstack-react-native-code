/**
 * Creates an array containing integers from 0 up to `max`.
 *
 * @param {number} max
 * @returns {number[]}
 */
function range(max) {
  const array = [];

  for (let i = 0; i < max; i++) {
    array[i] = i;
  }

  return array;
}

/**
 * @typedef {{size: number, board: number[], empty: number}} Puzzle
 */

/**
 * Creates a new puzzle object.
 *
 * @param {number} size The length & width of the board.
 * @returns {Puzzle} The new puzzle state.
 */
export function createPuzzle(size) {
  const board = range(size * size);

  const puzzle = {
    size,
    board,
    empty: Math.floor(Math.random() * (size * size - 1)),
  };

  return shuffleBoard(puzzle);
}

/**
 * Shuffles the puzzle board.
 *
 * @param {Puzzle} puzzle
 * @returns {Puzzle} Shuffled puzzle.
 */
function shuffleBoard(puzzle) {
  let previous = null;

  for (let i = 0; i < 1000; i++) {
    const moves = movableSquares(puzzle).filter(square => square !== previous);
    const square = moves[Math.floor(Math.random() * (moves.length - 1))];

    // eslint-disable-next-line no-param-reassign
    puzzle = move(puzzle, square);
    previous = square;
  }

  return puzzle;
}

/**
 * Finds the squares adjacent to the empty square.
 *
 * @param {Puzzle} puzzle
 * @returns {number[]} Possible squares to move.
 */
export function movableSquares(puzzle) {
  const { size, board, empty } = puzzle;

  const emptyIndex = getIndex(puzzle, empty);

  const adjacent = [
    emptyIndex - size,
    emptyIndex + size,
    emptyIndex % size !== 0 ? emptyIndex - 1 : null,
    emptyIndex % size !== size - 1 ? emptyIndex + 1 : null,
  ]
    .filter(index => index !== null && index >= 0 && index < size * size)
    .map(index => board[index]);

  return adjacent;
}

/**
 * Returns the direction a piece can be moved.
 *
 * @param {Puzzle} puzzle
 * @param {number} square
 * @returns {string} The available direction to move.
 */
export function availableMove(puzzle, square) {
  const { size, empty } = puzzle;

  const squareIndex = getIndex(puzzle, square);
  const emptyIndex = getIndex(puzzle, empty);

  const canMove = movableSquares(puzzle).includes(square);

  if (canMove && squareIndex - size === emptyIndex) return 'up';
  if (canMove && squareIndex + size === emptyIndex) return 'down';
  if (canMove && squareIndex - 1 === emptyIndex) return 'left';
  if (canMove && squareIndex + 1 === emptyIndex) return 'right';

  return 'none';
}

/**
 * Finds the index of a square.
 *
 * @param {Puzzle} puzzle
 * @param {number} square
 * @returns {number} Index of the square
 */
export function getIndex(puzzle, square) {
  const { board } = puzzle;

  return board.indexOf(square);
}

/**
 * Swaps a square with the empty square.
 *
 * @param {Puzzle} puzzle
 * @param {number} square
 * @returns {Puzzle} The updated puzzle state.
 */
export function move(puzzle, square) {
  const { board, empty } = puzzle;

  const squareIndex = getIndex(puzzle, square);
  const emptyIndex = getIndex(puzzle, empty);

  const copy = board.slice();
  copy[emptyIndex] = board[squareIndex];
  copy[squareIndex] = board[emptyIndex];

  return {
    ...puzzle,
    board: copy,
  };
}

/**
 * Returns true if the puzzle board has been solved.
 *
 * @param {Puzzle} puzzle
 * @returns {boolean} This puzzle is solved.
 */
export function isSolved(puzzle) {
  const { board } = puzzle;

  return board.every((square, index) => square === index);
}

/**
 * Prints the puzzle board to the console.
 *
 * @param {Puzzle} puzzle
 */
export function print(puzzle) {
  const { size, board } = puzzle;

  for (let i = 0; i < size; i++) {
    console.log(board.slice(i * size, (i + 1) * size).join(', '));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!;
  const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  let currentPlayer: 'X' | 'O' = 'X';
  const moves: { [index: string]: 'X' | 'O' } = {};
  let gameWon = false;

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i.toString());
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(event: Event) {
    if (!gameWon) {
      const index = (event.target as HTMLDivElement).getAttribute('data-index');
      if (index && !moves[index]) {
        (event.target as HTMLDivElement).textContent = currentPlayer;
        moves[index] = currentPlayer;
        checkWin(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkWin(player: 'X' | 'O') {
    const winPatterns: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
      [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    for (const pattern of winPatterns) {
      if (pattern.every(index => moves[index.toString()] === player)) {
        gameWon = true;
        setTimeout(() => alert(`${player} wins!`), 0);
        return;
      }
    }

    if (Object.keys(moves).length === 9) {
      gameWon = true;
      setTimeout(() => alert("It's a draw!"), 0);
    }
  }

  function undoMove() {
    if (!gameWon && Object.keys(moves).length > 0) {
      const lastMove = Object.keys(moves).pop()!;
      const cell = document.querySelector(`[data-index="${lastMove}"]`) as HTMLDivElement;
      cell.textContent = '';
      delete moves[lastMove];
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function resetGame() {
    currentPlayer = 'X';
    Object.keys(moves).forEach(index => {
      const cell = document.querySelector(`[data-index="${index}"]`) as HTMLDivElement;
      cell.textContent = '';
    });
    Object.keys(moves).forEach(index => delete moves[index]);
    gameWon = false;
  }

  createBoard();
  backBtn.addEventListener('click', undoMove);
  resetBtn.addEventListener('click', resetGame);
});
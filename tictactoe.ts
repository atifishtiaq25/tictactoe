document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!;
  const buttonsContainer = document.getElementById('buttons-container') as HTMLElement;
  const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  const welcomeScreen = document.getElementById('welcomeScreen') as HTMLDivElement;

  let currentPlayer: 'X' | 'O' = 'X';
  const moves: { [index: string]: 'X' | 'O' } = {};
  let gameWon = false;


  function showWelcomeScreen() {
    welcomeScreen.style.display = 'flex';
  }

  function hideWelcomeScreen() {
    welcomeScreen.style.display = 'none';
  }

  function handleCellHover(event: Event) {
    const index = (event.target as HTMLDivElement).getAttribute('data-index');
    const cell = event.target as HTMLDivElement;

    if (gameWon) {
      return;
    }
    else if (index && !moves[index]) {
      cell.style.transition = 'background-color 0.3s ease';
      cell.style.backgroundColor = 'lightgreen';
    } else if (cell.textContent && cell.classList.contains('cell')) {
      cell.style.transition = 'background-color 0.3s ease';
      cell.style.backgroundColor = 'lightcoral';
    }
  }

  function resetCellHover(event: Event) {
    const cell = event.target as HTMLDivElement;
    cell.style.transition = '';
    cell.style.backgroundColor = '';
  }

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i.toString());
      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('mouseover', handleCellHover);
      cell.addEventListener('mouseout', resetCellHover);
      board.appendChild(cell);
    }
  }

  function hideBoardAndButtons() {  
    board.style.display = 'none';
    buttonsContainer.style.display = 'none';
  }
  
  function showBoardAndButtons() {  
    board.style.display = 'grid';
    buttonsContainer.style.display = 'flex'
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

  function handleCellClick(event: Event) {
    if (!gameWon) {
      const index = (event.target as HTMLDivElement).getAttribute('data-index');
      if (index && !moves[index]) {
        (event.target as HTMLDivElement).textContent = currentPlayer;
        moves[index] = currentPlayer;
        checkWin(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    } else {
      setTimeout(() => alert('Reset the board to play again!!'), 0);
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

  backBtn.addEventListener('click', undoMove);
  resetBtn.addEventListener('click', resetGame);

  hideBoardAndButtons();
  createBoard();

  showWelcomeScreen();

  const startGameBtn = document.getElementById('startGameBtn') as HTMLButtonElement;
  startGameBtn.addEventListener('click', () => {
    hideWelcomeScreen();
    showBoardAndButtons();
  });
});
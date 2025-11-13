const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  if (!board.includes("")) return "draw";
  return null;
}
function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || board[idx] !== "") return;
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    if (winner === "draw") {
      status.textContent = "It's a draw!";
    } else {
      status.textContent = `${winner} wins!`;
    }
    cells.forEach(cell => cell.disabled = true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
  }
}
cells.forEach(cell => {
  cell.textContent = "";
  cell.addEventListener('click', handleCellClick);
  cell.disabled = false;
});
status.textContent = `${currentPlayer}'s turn`;
resetBtn.onclick = function() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
  status.textContent = `${currentPlayer}'s turn`;
};

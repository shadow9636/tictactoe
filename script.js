let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;

function makeMove(cell, index) {
  if (board[index] === "" && !isGameOver) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    playAudio("click"); // play on each move

    if (checkWin()) {
      document.getElementById("status").textContent = "Player ${currentPlayer} wins!";
      playAudio("win"); // play win sound
      isGameOver = true;
    } else if (board.every(cell => cell !== "")) {
      document.getElementById("status").textContent = "It's a draw!";
      playAudio("draw"); // play draw sound
      isGameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("status").textContent = "Player ${currentPlayer}'s turn";
      playAudio("turn"); // optional sound for turn change
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  document.getElementById("status").textContent = "Player X's turn";
  playAudio("reset"); // play reset sound
}

// 🔊 AUDIO FUNCTION
function playAudio(type) {
  const audio = new Audio();
  switch (type) {
    case "click":
      audio.src = "hello.mp3";
      break;
    case "win":
      audio.src = "lakalaka.mp3  "  ;
      break;
    case "draw":
      audio.src = "bh.mp3";
      break;
    case "turn":
      audio.src = "gunsound.mp3";
      break;
    case "reset":
      audio.src = "le.mp3";
      break;
    default:
      return;
  }
  audio.play();
}
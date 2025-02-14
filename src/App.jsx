import { useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = (squares) => {
    for (let combination of winnerCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || getWinner(board)) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "X" : "O";
    setBoard(updatedBoard);
    setIsXNext(!isXNext);
  };

  const gameStatus = () => {
    const winner = getWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every((square) => square !== null)) {
      return "It's a tie!";
    }
    return `Next player: ${isXNext ? "X" : "O"}`;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="text-white text-5xl font-semibold mb-8 text-center">
          Tic Tac Toe
        </h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-500 animate-bounce"
              : "text-xl text-white"
          }`}
        >
          {gameStatus()}
        </div>
        <div className="grid grid-cols-3 gap-1 overflow-hidden mb-6 rounded-xl">
          {board.map((square, index) => (
            <button
              key={index}
              className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 ${
                square ? "text-white" : "text-gray-800"
              }`}
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          onClick={resetGame}
          className="cursor-pointer w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;

// Tictactoe_game.jsx
import React, {useState, useEffect} from 'react';
import '../game.css';

const TTT = () => {
  const [chessgrid, setChessgrid] = useState(Array(9).fill(''));
  const [xIndex, setXIndex] = useState([]);
  const [oIndex, setOIndex] = useState([]);
  const [turn, setTurn] = useState(false);  // true为x false为o
  const [gameOver, setGameOver] = useState(false);  // 添加游戏结束状态

  const initial = () => {
    setChessgrid(Array(9).fill(''));
    setXIndex([]);
    setOIndex([]);
    setTurn(false);
    setGameOver(false);
  }

  const handleClick = (k) => {
    // 如果游戏结束或格子已被占用，不处理
    if (gameOver || chessgrid[k] !== '') {
      return;
    }

    const newGrid = [...chessgrid];
    const currentPlayer = turn ? 'x' : 'o';
    newGrid[k] = currentPlayer;
    setChessgrid(newGrid);

    if (turn) {
      setXIndex(prev => [...prev, k]);
    } else {
      setOIndex(prev => [...prev, k]);
    }

    setTurn(!turn);
  }

  const checkWinner = () => {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // 横
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // 竖
      [0, 4, 8], [2, 4, 6]  // 对角
    ];

    // 检查获胜
    for (let line of winLines) {
      if(line.every(index=>xIndex.includes(index))){
        return 'X';
      }
    }

    for (let line of winLines) {
      if(line.every(index=>oIndex.includes(index))){
        return 'O';
      }
    }

    // 检查平局
    if (chessgrid.every(cell => cell !== '')) {
      return 'Draw';
    }

    return null;
  }

  useEffect(() => {
    initial();
  }, []);

  useEffect(() => {
    const result = checkWinner();
    if (result) {
      setGameOver(true);
      if (result === 'Draw') {
        alert('Draw!');
      } else {
        alert(`Player ${result} wins!`);
        const wins = Number(localStorage.getItem('gamesWin') || 0);
        localStorage.setItem('gamesWin', wins + 1);
      }
    }
  }, [chessgrid]);

  return (
    <div className='game-pad'>
      <div className='chess-area'>
        {chessgrid.map((c, k) => (
          <div
            key={k}
            className='chess-cell'
            onClick={() => handleClick(k)}
          >
            {c}
          </div>
        ))}
      </div>
      <button onClick={initial}>Reset</button>
    </div>
  );
}

export default TTT;
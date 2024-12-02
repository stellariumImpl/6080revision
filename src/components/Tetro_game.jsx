// Tetris_game.jsx
import React, { useState, useEffect } from 'react';
import '../game.css';

const TETROMINOS = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  L: [[1, 0], [1, 0], [1, 1]],
  J: [[0, 1], [0, 1], [1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]]
};

const Tetris = () => {
  const [board, setBoard] = useState(Array(20).fill().map(() => Array(10).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  // 初始化游戏
  const initial = () => {
    setBoard(Array(20).fill().map(() => Array(10).fill(0)));
    setGameOver(false);
    generateNewPiece();
  };

  // 生成新的方块
  const generateNewPiece = () => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    setCurrentPiece(TETROMINOS[randomPiece]);
    setCurrentPos({ x: 3, y: 0 }); // 从顶部中间开始
  };

  // 游戏主循环
  useEffect(() => {
    if (!gameOver && currentPiece) {
      const interval = setInterval(moveDown, 1000);
      return () => clearInterval(interval);
    }
  }, [currentPiece, gameOver]);

  // 向下移动
  const moveDown = () => {
    if (canMove(currentPos.x, currentPos.y + 1)) {
      setCurrentPos(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      placePiece();
    }
  };

  // 检查是否可以移动
  const canMove = (newX, newY) => {
    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x]) {
          const nextX = newX + x;
          const nextY = newY + y;
          if (nextY >= 20 || nextX < 0 || nextX >= 10 || board[nextY][nextX]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // 放置方块
  const placePiece = () => {
    const newBoard = [...board];
    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x]) {
          if (currentPos.y + y <= 0) {
            setGameOver(true);
            return;
          }
          newBoard[currentPos.y + y][currentPos.x + x] = 1;
        }
      }
    }
    setBoard(newBoard);
    checkLines(newBoard);
    generateNewPiece();
  };

  // 检查行满
  const checkLines = (newBoard) => {
    let linesCleared = 0;
    for (let y = 19; y >= 0; y--) {
      if (newBoard[y].every(cell => cell === 1)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(10).fill(0));
        linesCleared++;
      }
    }
    if (linesCleared > 0) {
      setBoard([...newBoard]);
    }
  };

  // 键盘控制
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (canMove(currentPos.x - 1, currentPos.y)) {
            setCurrentPos(prev => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          if (canMove(currentPos.x + 1, currentPos.y)) {
            setCurrentPos(prev => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          // TODO: 旋转功能
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, currentPos, board, gameOver]);

  // 确保在组件挂载时初始化游戏
  useEffect(() => {
    initial();
  }, []);

  // 绘制当前活动的方块
  const drawCurrentPiece = () => {
    if (!currentPiece) return null; // 确保 currentPiece 不为 null

    const canvas = [];
    for (let y = 0; y < 20; y++) {
      const row = [];
      for (let x = 0; x < 10; x++) {
        let cellClass = 'tetris-cell';
        if (board[y][x]) {
          cellClass += ' filled';
        }
        for (let py = 0; py < currentPiece.length; py++) {
          for (let px = 0; px < currentPiece[py].length; px++) {
            if (currentPiece[py][px] && currentPos.y + py === y && currentPos.x + px === x) {
              cellClass += ' active';
            }
          }
        }
        row.push(<div key={`${y}-${x}`} className={cellClass}></div>);
      }
      canvas.push(<div key={y} className='tetris-row'>{row}</div>);
    }
    return canvas;
  };

  return (
    <div className='game-pad'>
      <div className='tetris-board'>
        {drawCurrentPiece()}
      </div>
      {gameOver && <div className='game-over'>Game Over!</div>}
      <button onClick={initial}>Reset</button>
    </div>
  );
};

export default Tetris;
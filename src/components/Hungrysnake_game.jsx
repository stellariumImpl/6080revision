// Tictactoe_game.jsx
import React, {useState, useEffect} from 'react';
import '../game.css';

const HS = () => {
  const [gameOver, setGameOver] = useState(false);
  const [moveGrid, setMoveGrid] = useState([]);
  const [snake, setSnake] = useState([44, 43, 42]);
  const [direction, setDirection] = useState('right');
  const [foods, setFoods] = useState([]); // 改为食物数组
  const [isPaused, setPaused] = useState(false); // 添加暂停状态
  const [score, setScore] = useState(0); // 添加分数

  // 生成多个食物
  const generateFoods = (count = 3) => { // 默认生成3个食物
    const newFoods = [];
    while (newFoods.length < count) {
      const newFood = Math.floor(Math.random() * 100);
      if (!snake.includes(newFood) && !newFoods.includes(newFood)) {
        newFoods.push(newFood);
      }
    }
    setFoods(newFoods);
  }

  const initial = () => {
    setMoveGrid(Array(100).fill(''));
    setSnake([44, 43, 42]);
    setDirection('right');
    setGameOver(false);
    setPaused(false);
    setScore(0);
    generateFoods();
  }

  const move = () => {
    if (gameOver || isPaused) return; // 添加暂停检查

    const newSnake = [...snake];
    let newHead;

    switch (direction) {
      case 'right':
        newHead = newSnake[0] + 1;
        break;
      case 'left':
        newHead = newSnake[0] - 1;
        break;
      case 'up':
        newHead = newSnake[0] - 10;
        break;
      case 'down':
        newHead = newSnake[0] + 10;
        break;
      default:
        break;
    }

    if (
      newHead < 0 ||
      newHead >= 100 ||
      (direction === 'right' && newHead % 10 === 0) ||
      (direction === 'left' && newHead % 10 === 9)
    ) {
      setGameOver(true);
      return;
    }

    // 检查是否吃到食物
    if (foods.includes(newHead)) {
      newSnake.unshift(newHead);
      setScore(prev => prev + 1);
      // 移除被吃掉的食物并生成新的
      const newFoods = foods.filter(f => f !== newHead);
      newFoods.push(generateSingleFood(newSnake, newFoods));
      setFoods(newFoods);

      // 达到目标分数获胜
      if (score + 1 >= 10) { // 比如10分算赢
        const wins = Number(localStorage.getItem('gamesWin') || 0);
        localStorage.setItem('gamesWin', wins + 1);
        alert('You win!');
        setGameOver(true);
        return;
      }
    } else {
      newSnake.unshift(newHead);
      newSnake.pop();
    }

    if (newSnake.slice(1).includes(newHead)) {
      setGameOver(true);
      return;
    }

    setSnake(newSnake);
  }

  // 生成单个食物的辅助函数
  const generateSingleFood = (currentSnake, currentFoods) => {
    let newFood;
    do {
      newFood = Math.floor(Math.random() * 100);
    } while (currentSnake.includes(newFood) || currentFoods.includes(newFood));
    return newFood;
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') { // 空格键暂停/继续
        setPaused(prev => !prev);
        return;
      }

      if (isPaused) return; // 暂停时不处理方向键

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPaused]);

  useEffect(() => {
    const gameLoop = setInterval(move, 200);
    return () => clearInterval(gameLoop);
  }, [snake, direction, foods, gameOver, isPaused]);

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className='game-pad'>
      <div className='game-info'>
        <span>Score: {score}</span>
        <span>{isPaused ? 'PAUSED' : 'PLAYING'}</span>
      </div>
      <div className='snake-move-area'>
        {moveGrid.map((_, k) => (
          <div
            key={k}
            className={`move-cell 
              ${snake.includes(k) ? 'snake' : ''} 
              ${foods.includes(k) ? 'food' : ''}`}
          />
        ))}
      </div>
      {gameOver && <div className='game-over'>Game Over!</div>}
      <div className='controls'>
        <button onClick={initial}>Reset</button>
        <button onClick={() => setPaused(p => !p)}>
          {isPaused ? 'Continue' : 'Pause'}
        </button>
      </div>
    </div>
  );
}

export default HS;
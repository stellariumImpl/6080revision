// Tictactoe_game.jsx
import React, {useState, useEffect} from 'react';
import '../game.css';

const GN = () => {

  const [gameOver, setGameOver] = useState(false);  // 添加游戏结束状态
  const [min,setMin] = useState('');
  const [max,setMax] = useState('');
  const [guess, setGuess] = useState('');
  const [target, setTarget] = useState();
  const [attempts, setAttempts] = useState(0);
  const [message,setMessage] = useState('Game start!');

  const initial = () => {

    // 生成随机数
    const newTarget = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('target', newTarget);
    setTarget(newTarget);
    setAttempts(0);
    setGameOver(false);
    setGuess('');
  }

  const minThreshold=(e)=>{
    const minNumber=Number(e.target.value);
    setMin(minNumber);
  }

  const maxThreshold=(e)=>{
    const maxNumber=Number(e.target.value);
    setMax(maxNumber);
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setGuess(value);
  }

  const handleGuess=()=>{
    const num=Number(guess);
    if (isNaN(num) || num < min || num > max) {
      setMessage(`请输入${min}-${max}之间的数字！`);
      return;
    }

    // 更新尝试次数和历史记录
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if(num===target){
      setMessage(`Congrats, within ${newAttempts} and you got the right one!`);
      setGameOver(true);
      if (newAttempts<=10){
        const wins = Number(localStorage.getItem('gamesWin') || 0);
        localStorage.setItem('gamesWin',wins+1);
      }
    }else if(num<target){
      setMessage('猜小了');
    }else if(num>target){
      setMessage('猜大了');
    }

    setGuess(''); //清空输入

  }

  useEffect(() => {
    initial();
  }, [min, max]);

  return(
    <div className='game-pad'>
      <h1>Guess number:</h1>
      <span>Give the min: <input type='number' value={min} onChange={(e) => minThreshold(e)}/></span>
      <span>Give the max: <input type='number' value={max} onChange={(e) => maxThreshold(e)}/></span>
      <div className='game-info'>
        <p>尝试次数: {attempts}</p>
        <p>{message}</p>
      </div>

      <div className='  '>
        <input
          className='guess-input-box'
          type="number"
          value={guess}
          onChange={handleInput}
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>Guess!</button>
      </div>
      <button onClick={initial}>Reset</button>
    </div>
  )


}

export default GN;
import '../App.css';
import React, {useState, useEffect} from 'react';

// Dashboard.jsx
const Dashboard = () => {
  const [gamesWin, setGamesWin] = useState(0);
  const [remainingToWin, setRemainingToWin] = useState(5);

  useEffect(() => {
    const wins = Number(localStorage.getItem('gamesWin') || 0);
    setGamesWin(wins);
    if(5 - wins>=0){
      setRemainingToWin(5 - wins);
    }else{
      setRemainingToWin(0);
    }

  }, []);

  const reset = () => {
    localStorage.setItem('gamesWin', 0);
    setGamesWin(0);
    setRemainingToWin(5);
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-grid'>
        <div className='dashboard-box'>remainingToWin: {remainingToWin}</div>
        <div className='dashboard-box'>gamesWin: {gamesWin}</div>
        <div className='dashboard-box'>
          {remainingToWin === 0 ? "Great job" : "Keep going"}
        </div>
        <div className='dashboard-box'>
          <span onClick={reset}>(Reset)</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
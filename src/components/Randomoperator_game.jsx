// Randomoperator_game.jsx
import React, {useEffect, useState} from 'react';
import '../game.css';

const Mathgame =()=>{
  const [firstcontainer,setFirstcontainer] = useState('');
  const [secondcontainer,setSecondcontainer] = useState('');
  const [thirdcontainer,setThirdcontainer] = useState('');
  const [fourthcontainer,setFourthcontainer] = useState('=');
  const [fifthcontainer,setFifthcontainer] = useState('');
  const [target,setTarget] = useState('');

  const generateNumber = () => {
    return Math.floor(Math.random() * (50 - 1 + 1)) + 1;
  }

  const generateCharacter = () => {
    const characters=['+','-','*','/','%'];
    const idx= Math.floor(Math.random() * 5);
    return characters[idx];
  }

  const initial=()=>{
    const firstcontainerValue = generateNumber();
    setFirstcontainer(firstcontainerValue);

    const thirdcontainerValue = generateNumber();
    setThirdcontainer(thirdcontainerValue);

    const secondcontainerValue = generateCharacter();
    setSecondcontainer(secondcontainerValue);
  }

  const handleInput=(e)=>{
    // const value = Number(e.target.value);
    setFifthcontainer(e.target.value);
    let target=0;
    if(secondcontainer==='+'){
      target=firstcontainer+thirdcontainer;
      console.log(target);
    }else if(secondcontainer ==='-'){
      target=firstcontainer-thirdcontainer;
      console.log(target);
    }else if(secondcontainer ==='*'){
      target=firstcontainer*thirdcontainer;
      console.log(target);
    }else if(secondcontainer ==='/'){
      target=Number((firstcontainer/thirdcontainer).toFixed(1));
      console.log(target);
    }else if(secondcontainer ==='%'){
      target=firstcontainer%thirdcontainer;
      console.log(target);
    }

    setTarget(target);
  }

  const checkAnswer=()=>{
    if (target==fifthcontainer){
      alert('Win!')
      const wins = Number(localStorage.getItem('gamesWin') || 0);
      localStorage.setItem('gamesWin', wins + 1);
    }
  }



  useEffect(() => {
    initial();
  }, []);

  return (
    <div className='game-pad'>
      <div className='row-container'>
        <div className='row-container-cell'>
          {firstcontainer}
        </div>
        <div className='row-container-cell'>
          {secondcontainer}
        </div>
        <div className='row-container-cell'>
          {thirdcontainer}
        </div>
        <div className='row-container-cell'>
          {fourthcontainer}
        </div>
        <div className='row-container-cell'>
          {/*{fifthcontainer}*/}
          <input onChange={handleInput}
                 onKeyUp={(e)=>{
                   if (e.key === 'ArrowRight'){
                     checkAnswer();
                   }
                 }}
                 value={fifthcontainer} type='number' />
        </div>
      </div>
      <button onClick={initial}>Reset</button>
    </div>
  )
}

export default Mathgame;
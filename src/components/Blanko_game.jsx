// Blanko_game.jsx
import React, { useState, useEffect } from 'react';
import { strs } from './Blanko';
import '../game.css';

const Blanko = () => {
  const [blanko, setBlanko] = useState(['','','','','','','','','','','','']);
  const [answer, setAnswer] = useState('');

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const word = strs[randomIndex];
    setAnswer(word);
    console.log('New word:', word);

    const positions = [];
    while (positions.length < 3) {
      const pos = Math.floor(Math.random() * word.length);
      if (!positions.includes(pos) && word[pos] !== ' ') {
        positions.push(pos);
      }
    }

    const newBlank = word.split('').map((char, index) =>
      positions.includes(index) ? '_' : char
    );
    setBlanko(newBlank);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  const handleChange = (e, k) => {
    const newBlanko = [...blanko];
    newBlanko[k] = e.target.value;
    setBlanko(newBlanko);

    console.log(newBlanko);

    if (!newBlanko.includes('_')) {
      if (newBlanko.join('') === answer) {
        const wins = Number(localStorage.getItem('gamesWin') || 0);
        const newWins = wins + 1;
        localStorage.setItem('gamesWin', newWins);
        console.log('Games won:', newWins);
        alert('Correct!');
      } else {
        alert('Incorrect!');
      }
    }
  };

  return (
    <div className='game-pad'>
      <div className='blanko-line'>
        {blanko.map((b, k) => (
          <div key={k}>
            {b === '_' ? (
              <input
                className='cell-input'
                type='text'
                maxLength="1"
                onChange={(e) => handleChange(e, k)}
              />
            ) : (
              <div className='cell'>{b}</div>
            )}
          </div>
        ))}
      </div>
      <button onClick={generateNewWord}>Reset</button>
    </div>
  );
};

export default Blanko;
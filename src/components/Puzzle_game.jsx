// Puzzle_game.jsx
import React, {useState, useEffect} from 'react';
import '../game.css';
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'

const Puzzle = () => {
  const [puzzlePad, setPuzzlePad] = useState([]);

  const initial = () => {
    const ArrayOfPuzzle = [img1, img2, img3, img4, img5, img6, img7, '',img8];
    ArrayOfPuzzle.sort(() => Math.random() - 0.5);
    setPuzzlePad(ArrayOfPuzzle);
  }

  const isWin = (currentPuzzle) => {
    const winningOrder = [img1, img2, img3, img4, img5, img6, img7, img8, ''];
    return currentPuzzle.every((img, index) => img === winningOrder[index]);
  }

  const handleClick = (k) => {
    const newPuzzlePad = [...puzzlePad]
    if (puzzlePad[k + 1] === '' || puzzlePad[k + 3] === '' || puzzlePad[k - 1] === '' || puzzlePad[k - 3] === '') {
      if (puzzlePad[k + 1] === '') {
        newPuzzlePad[k + 1] = newPuzzlePad[k];
        newPuzzlePad[k] = ''
        setPuzzlePad(newPuzzlePad);
        if (isWin(newPuzzlePad)) {
          const wins = Number(localStorage.getItem('gamesWin') || 0);
          localStorage.setItem('gamesWin', wins + 1);
          alert('You win!');
        }
        console.log('向右');
      }

      if (puzzlePad[k + 3] === '') {
        newPuzzlePad[k + 3] = newPuzzlePad[k];
        newPuzzlePad[k] = ''
        setPuzzlePad(newPuzzlePad);
        if (isWin(newPuzzlePad)) {
          const wins = Number(localStorage.getItem('gamesWin') || 0);
          localStorage.setItem('gamesWin', wins + 1);
          alert('You win!');
        }
        console.log('向下');
      }

      if (puzzlePad[k - 1] === '') {
        newPuzzlePad[k - 1] = newPuzzlePad[k];
        newPuzzlePad[k] = ''
        setPuzzlePad(newPuzzlePad);
        if (isWin(newPuzzlePad)) {
          const wins = Number(localStorage.getItem('gamesWin') || 0);
          localStorage.setItem('gamesWin', wins + 1);
          alert('You win!');
        }
        console.log('向左');
      }

      if (puzzlePad[k - 3] === '') {
        newPuzzlePad[k - 3] = newPuzzlePad[k];
        newPuzzlePad[k] = ''
        setPuzzlePad(newPuzzlePad);
        if (isWin(newPuzzlePad)) {
          const wins = Number(localStorage.getItem('gamesWin') || 0);
          localStorage.setItem('gamesWin', wins + 1);
          alert('You win!');
        }
        console.log('向上');
      }
    }
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className='game-pad'>
      <div className='puzzle-pad'>
        {puzzlePad.map((p, k) => (
          <div
            className='puzzle-cell'
            key={k}
            onClick={() => handleClick(k)}
          >
            {p && <img src={p} alt={`piece ${k}`}/>}
          </div>
        ))}
      </div>
      <button onClick={initial}>Reset</button>
    </div>
  )
}

export default Puzzle;
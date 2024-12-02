// Memory_game.jsx
import React, {useState, useEffect} from 'react';
import '../game.css';

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [flipIndex, setFlipIndex] = useState([]);
  const [matchIndex, setMatchIndex] = useState([]);

  const initial = () => {
    const emoji = ['🌟', '🎈', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸'];
    const allcards = [...emoji, ...emoji];
    const shuffledcards = allcards.sort(() => Math.random() - 0.5);
    console.log('Initialized cards:', shuffledcards);
    setCards(shuffledcards);
  }

  useEffect(() => {
    initial();
  }, []);

  const handleClick = (k) => {
    // 如果点击已翻开的卡片，不处理
    if (flipIndex.includes(k)) {
      console.log('Card already flipped');
      return;
    }

    // 如果点击已匹配的卡片，不处理
    if (matchIndex.includes(k)) {
      console.log('Card already matched');
      return;
    }

    // 如果已翻开两张牌，先翻回去再处理新的点击
    if (flipIndex.length === 2) {
      console.log('Two cards already flipped, resetting');
      setFlipIndex([k]);
      return;
    }

    // 添加新翻开的牌
    const newFlip = [...flipIndex, k];
    console.log('New flipIndex:', newFlip);
    setFlipIndex(newFlip);

    // 当翻开两张牌时，检查是否匹配
    if (newFlip.length === 2) {
      const [first, second] = newFlip;

      if (cards[first] === cards[second]) {
        // 匹配成功
        console.log('Match found!');
        setMatchIndex([...matchIndex, first, second]);
        setFlipIndex([]);

        if (matchIndex.length + 2 === cards.length) {
          const wins = Number(localStorage.getItem('gamesWin') || 0);
          localStorage.setItem('gamesWin', wins + 1);
          alert('You win!');
        }
      } else {
        // 不匹配，1秒后翻回
        console.log('No match, flipping back in 1s');
        setTimeout(() => {
          setFlipIndex([]);
        }, 1000);
      }
    }
  };

  return (
    <div className='game-pad'>
      <div className='card-area'>
        {cards.map((card, k) => (
          <div
            key={k}
            className='card-cell'
            onClick={() => handleClick(k)}
          >
            {(matchIndex.includes(k) || flipIndex.includes(k)) ? card : '?'}
          </div>
        ))}
      </div>
      <button onClick={initial}>Reset</button>
    </div>
  )
}

export default Memory;
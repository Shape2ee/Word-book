import React from 'react';
import { useAppSelector } from '@hooks/reduxHooks';
const WordGame = () => {
  const gameNumber = useAppSelector((state) => state.game.number)

  return (
    <div>
          <div>문제 수: {gameNumber}</div>
          <h2>apple</h2>
          <form>
            <input placeholder='위의 단어의 뜻을 입력하세요.'/>
            <button>확인</button>
          </form>
    </div>
  );
};

export default WordGame;
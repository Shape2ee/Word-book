import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/reduxHooks';
const WordGame = () => {
  const gameNumber = useAppSelector((state) => state.game.number)
  const wordList = useAppSelector((state) => state.word.wordList)
  const [testWordList, setTestWordList] = useState<string>('')
  const randomWord = (): any => {
    const copyWordList = [...wordList]
    const chose = copyWordList[(Math.floor(Math.random() * copyWordList.length))];
    return chose
    // console.log(copyWordList)
    // shuffleWordList.push(chose)
    // return shuffleWordList
  }
  const choseWord = async () => {
    const word = await randomWord()
    setTestWordList(word.word)
    console.log(testWordList, wordList)
  }

  useEffect(() => {
    choseWord()
  }, [])

  return (
    <div>
      <div>문제 수: {gameNumber}</div>
      <h2>{testWordList}</h2>
      <form>
        <input placeholder='위의 단어의 뜻을 입력하세요.'/>
        <button>확인</button>
      </form>
    </div>
  );
};

export default WordGame;
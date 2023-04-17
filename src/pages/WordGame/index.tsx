import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@hooks/reduxHooks';
const WordGame = () => {
  const gameNumber = useAppSelector((state) => state.game.number)
  const wordList = useAppSelector((state) => state.word.wordList)
  const [testWordList, setTestWordList] = useState<any[]>([])
  const [count, setCount] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const randomWord = (): any[] => {
    let copyWordList = [...wordList]
    // console.log(copyWordList)
    const shuffleWordList: any = []
    for(let i = 0; i < gameNumber; i++) {
      if (copyWordList.length === 0) {
        copyWordList = [...wordList]
      }
      const chose = copyWordList.splice(Math.floor(Math.random() * copyWordList.length), 1)[0];
      shuffleWordList.push(chose)
      // console.log(copyWordList)
    }
    return shuffleWordList
  }

  const choseWordList = async () => {
    const testList = await randomWord()
    setTestWordList([...testList])
    // console.log(testWordList, wordList)
  }

  useEffect(() => {
    choseWordList()
  }, [])

  const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const anwser = formData.get('anwser')
    if (testWordList[count].text === anwser) {
      console.log(true)
      setScore((prev) => prev + 1)
    }
    // console.log(anwser)
    // console.log(testWordList[count].word, testWordList[count].text)
    setCount((prev) => prev + 1)
    if (inputRef.current !== null) {
      inputRef.current.value = ''
    }

    if (count === (gameNumber - 1)) {
      alert('게임 끝!!!!!')
      return
    }
  }
  
  
  console.log(testWordList, wordList)
  return (
    <div>
      <div>문제 수: {gameNumber}</div>
      <h2>{testWordList[count]?.word}</h2>
      <form onSubmit={handleFormSubmit}>
        <input name='anwser' ref={inputRef} placeholder='위의 단어의 뜻을 입력하세요.'/>
        <button>확인</button>
      </form>
      <div>{score}</div>
    </div>
  );
};

export default WordGame;
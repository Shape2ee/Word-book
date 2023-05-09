import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@hooks/reduxHooks';
import { WordListType } from '@customTypes/CustumTypes';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';

const WordGame = () => {
  const gameNumber = useAppSelector((state) => state.game.number)
  const [wordList, setWordList] = useState<WordListType[]>([])
  const [testWordList, setTestWordList] = useState<any[]>([])
  const [count, setCount] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [result, setResult] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const getRandomWord = async () => {
    const res  = await fetcher(METHOD.GET, '/wordList')
    const userId = sessionStorage.getItem('user')
    if (userId === undefined) return
    const userList = res.filter((v: WordListType) => v.userId === userId)

    let copyWordList = await [...userList]
    console.log(copyWordList)
    const shuffleWordList: any = []
    for(let i = 0; i < gameNumber; i++) {
      if (copyWordList.length === 0) {
        copyWordList = [...userList]
      }
      const chose = copyWordList.splice(Math.floor(Math.random() * copyWordList.length), 1)[0];
      shuffleWordList.push(chose)
      // console.log(copyWordList)
    }
    await setTestWordList([...shuffleWordList])
  }

  useEffect(() => {
    getRandomWord()
  }, [])

  const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const anwser = formData.get('anwser')
    if (testWordList[count].text === anwser) {
      console.log(true)
      setScore((prev) => prev + 1)
      setResult('정답!')
    } else {
      setResult('땡!')
    }

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
      <div>{result}</div>
    </div>
  );
};

export default WordGame;
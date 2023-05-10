import React, { useEffect, useRef, useState } from 'react';
import $ from './wordGame.module.scss'
import Title from '@components/Title';
import Wrapper from '@components/Wrapper';
import Button from '@components/Button'
import { useAppSelector } from '@hooks/reduxHooks';
import { WordListType } from '@customTypes/CustumTypes';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Icon from '@components/Icon';

const cx = classNames.bind($)

const WordGame = () => {
  const navigate = useNavigate()
  const gameNumber = useAppSelector((state) => state.game.number)
  const [testWordList, setTestWordList] = useState<WordListType[]>([])
  const [count, setCount] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  // const [result, setResult] = useState<string>('')///
  const [answerValue, setAnswerValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const getRandomWord = async () => {
    const res  = await fetcher(METHOD.GET, '/wordList')
    const userId = sessionStorage.getItem('user')
    console.log(userId)
    if (userId === undefined || userId === null) {
      alert('로그인을 먼저 해주세요!')
      navigate('/login')
      return
    }
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

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const answer = formData.get('answer')

    if (testWordList[count].text === answer) {
      console.log(true)
      setScore((prev) => prev + 1)
    }
    setCount((prev) => prev + 1)
    setAnswerValue('')
    // if (inputRef.current !== null) {
    //   inputRef.current.value = ''
    // }

    if (count === (gameNumber - 1)) {
      alert('게임 끝!!!!!')
      navigate('../')
      return
    }
  }

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerValue(e.target.value)
  }

  const handleReStartGame = () => {
    location.reload();
  }
  
  console.log(testWordList)
  return (
    <Wrapper>
      <div className={$.word_game_container}>
        <div className={$.word_game_wrapper}>
          <Title text='단어 게임' center/>
          <div className={$.game_wrap}>
            <div className={cx('game_number', 'border')}>
              문제 수: {count} / <span>{gameNumber}</span>
            </div>
            <h2 className={$.word_title}>
              {
                testWordList[count]?.word.split('').map((word, i) => {
                  return (
                    <span key={testWordList[count]?.word + i} className={$.word_item}>{word}</span>  
                  )
                })
              }</h2>
            <form onSubmit={handleSubmitAnswer} className={$.answer_wrap}>
              <input name='answer' ref={inputRef} placeholder='위의 단어의 뜻을 입력하세요.' value={answerValue} onChange={handleAnswerChange}/>
              <Button text='확인' fillMain/>
            </form>
            <div className={cx('score', 'border')}>
              점수: <span>{score}</span>
            </div>
          </div>
        </div>
        <div className={$.reset_button} onClick={handleReStartGame}>
          <Icon kinds='reset'/>
          <Button text='리셋' />
        </div>
      </div>
    </Wrapper>
  );
};

export default WordGame;
import React from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'

const MOCK_DATA = [
  {
    word: 'apple',
    text: '사과',
    example: 'i like apple',
  },
  {
    word: 'banana',
    text: '바나나',
    example: 'i like banana',
  },
]

const MOCK_DATA_ARR = Array(10).fill({}).map((v, i) => {
  const item = MOCK_DATA[Math.floor(Math.random() * 2)]
  return {
    id: 10 - i,
    word: item.word,
    text: item.text,
    example: item.example,
    timetamp: 1234567890123 + i,
  }
})

const WordList = ({ isEdit }: { isEdit: boolean }) => {
  
  return (
    <ul className={$.word_list}>
      {
        MOCK_DATA_ARR.map((item) => <WordItem {...item} isEdit={isEdit}/>)
      }
    </ul>
  );
};

export default WordList;
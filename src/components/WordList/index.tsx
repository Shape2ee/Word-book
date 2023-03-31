import React from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'

const MOCK_DATA = [
  {
    id: 1,
    word: 'apple',
    text: '사과',
    example: 'i like apple',
    timetamp: 1234567890123,
  },
  {
    id: 2,
    word: 'banana',
    text: '바나나',
    example: 'i like banana',
    timetamp: 1234567890123,
  },
]

const WordList = ({ isEdit }: { isEdit: boolean }) => {
  
  return (
    <ul className={$.word_list}>
      {
        MOCK_DATA.map((item) => <WordItem {...item} isEdit={isEdit}/>)
      }
    </ul>
  );
};

export default WordList;
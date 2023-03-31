import React from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'
import { useAppSelector } from '@hooks/reduxHooks';

const WordList = ({ isEdit }: { isEdit: boolean }) => {
  const wordList = useAppSelector((state) => state.word.wordList) 
  return (
    <ul className={$.word_list}>
      {
        wordList.map((item) => <WordItem {...item} isEdit={isEdit}/>)
      }
    </ul>
  );
};

export default WordList;
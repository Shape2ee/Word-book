import React, { useState, useEffect } from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'
import { useAppSelector } from '@hooks/reduxHooks';

const WordList = ({ isEdit, checkedList, onChecked  }: { isEdit: boolean, checkedList: string[], onChecked:(id:string, isChecked: boolean) => void }) => {
  const wordList = useAppSelector((state) => state.word.wordList)

  return (
    <ul className={$.word_list}>
      {
        wordList.map((item) => <WordItem {...item} checkedList={checkedList} onChecked={onChecked} isEdit={isEdit}/>)
      }
    </ul>
  );
};

export default WordList;
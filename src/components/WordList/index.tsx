import React, { useState, useEffect } from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'
import { useAppSelector } from '@hooks/reduxHooks';
import classNames from 'classnames/bind';
import { WordListType } from '@customTypes/CustumTypes';
const cx = classNames.bind($)

interface WordListProps { 
  wordList: WordListType[],
  isEdit: boolean,
  checkedList: string[],
  onChecked:(id: string, isChecked: boolean) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, word: string, text: string) => void 
  // getWordList: () => void
}

const WordList = ({ wordList, isEdit, checkedList, onChecked, onDelete, onUpdate  }: WordListProps) => {
  const [isList, setList] = useState<boolean>(false)

  useEffect(() => {
    if (wordList.length <= 0) {
      setList(true)
    } else {
      setList(false)
    }
  }, [wordList])

  return (
    <ul className={cx('word_list', { isList })}>
      {
        wordList.length <= 0 ? <li>단어를 추가해주세요!</li>
        : wordList.map((item) => (
          <WordItem key={item.id} {...item}
            checkedList={checkedList}
            onChecked={onChecked}
            isEdit={isEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}/>
          ))
      }
    </ul>
  );
};

export default WordList;
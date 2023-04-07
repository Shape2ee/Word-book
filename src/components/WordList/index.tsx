import React, { useState, useEffect } from 'react';
import $ from './wordList.module.scss'
import WordItem from '@components/WordItem'
import { useAppSelector } from '@hooks/reduxHooks';
import classNames from 'classnames/bind';
import { WordListType } from '@customTypes/CustumTypes';
const cx = classNames.bind($)


// const getData = async () => {
//   const response = await fetch('http://localhost:5173/data/mockData.json')
//     .then((res) => res.json())
//     .catch((err) => console.log(err))
//     .then((data) => data)
//   return response
// }
interface WordListProps { 
  wordList: WordListType[],
  isEdit: boolean,
  checkedList: string[],
  onChecked:(id:string, isChecked: boolean) => void
  // getWordList: () => void
}

const WordList = ({ wordList, isEdit, checkedList, onChecked  }: WordListProps) => {
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
            isEdit={isEdit}/>
          ))
      }
    </ul>
  );
};

export default WordList;
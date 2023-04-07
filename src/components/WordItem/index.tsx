import React, { useRef, useState } from 'react';
import $ from './wordItem.module.scss'
import classNames from 'classnames/bind';
import Checkbox from '@components/Checkbox';
import Icon from '@components/Icon';
import { useAppDispatch } from '@hooks/reduxHooks';
import { deleteWord, updateWord } from '@customModules/wordSlice';
import { WordType } from '@customTypes/CustumTypes';
const cx = classNames.bind($)

interface WordItem {
  id: string
  word: string
  text: string
  timetamp: number
  isEdit: boolean
  checkedList: string[]
  onChecked: (id: string, isChecked: boolean) => void
  getWordList: () => void
}

const WordItem = ({ id, word, text, timetamp, isEdit, checkedList, onChecked, getWordList }: WordItem) => {
  const dispatch = useAppDispatch()
  const [isEditclicked, setEditClicked] = useState<boolean>(false)
  const [isUpdate, setUpdate] = useState<boolean>(false)
  const editButtonRef = useRef(null)
  const [input, setInput] = useState<WordType>({
    word: word,
    text: text,
  })
  const wordRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  const handleClickEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('handleClickEdit')
    console.log(e.currentTarget, e.target)
    setEditClicked(!isEditclicked)
  }

  const handleClickDelete = () => {
    dispatch(deleteWord(id))
    setEditClicked(!isEditclicked)
    getWordList()
  }

  const handleWordUpdate = () => {
    setUpdate(true)
    setEditClicked(!isEditclicked)
  }
  
  const handleUpdateClear = () => {
      console.log('handleUpdateClear')
    if (wordRef.current && textRef.current) {
      console.log(wordRef.current.value)
      const newWord = {
        id: id,
        word: wordRef.current.value,
        text: textRef.current.value,
      }
      dispatch(updateWord(newWord))
    }
    setUpdate(false)
    getWordList()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => {
      return {...prev, [name]: value} 
    })
  }

  return (
    <li className={$.word_item}>
      <label >
        {isEdit 
          && <Checkbox id={id}
                isChecked={checkedList.includes(id) ? true : false}
                onChecked={onChecked} />
        }
        <div className={cx('item_card', { isEdit })}>
          <h3 className={$.title}>
            { isUpdate 
              ? <input name='word' value={input.word}
                  ref={wordRef}
                  onChange={handleInputChange}/>
              : word}
          </h3>
          <p className={$.meaning}>
            { isUpdate 
              ? <input name='text'
                  value={input.text}
                  ref={textRef}
                  onChange={handleInputChange}/>
              : text}
          </p>
          {
            isUpdate ? (
              <div className={$.clear_button} onClick={handleUpdateClear}>저장</div>
            ) : <div className={$.date}>
              <Icon kinds='date'/>
              <p>
                {
                  new Date(timetamp).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })
                }
              </p>
            </div>
          }
          {
            !isEdit && (
              <div className={$.edit_wrap} >
                {
                  !isUpdate 
                  && <div className={$.button} onClick={handleClickEdit} 
                    ref={editButtonRef}>
                    <Icon kinds='edit' />
                  </div>
                }
                { isEditclicked && (
                  <ul className={$.edit_list}>
                    <li onClick={handleWordUpdate}>수정</li>
                    <li onClick={handleClickDelete}>삭제</li>
                  </ul>
                )
                }
              </div>
            )
          }

        </div>
      </label>
    </li>
  );
};

export default WordItem;
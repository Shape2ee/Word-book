import React, { useRef, useState } from 'react';
import $ from './wordItem.module.scss'
import classNames from 'classnames/bind';
import Checkbox from '@components/Checkbox';
import Icon from '@components/Icon';
// import { useAppDispatch } from '@hooks/reduxHooks';
// import { deleteWord, updateWord } from '@customModules/wordSlice';
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
  onDelete: (id: string) => void
  onUpdate: (id: string, word: string, text: string) => void 
}

const WordItem = ({ id, word, text, timetamp, isEdit, checkedList, onChecked, onDelete, onUpdate }: WordItem) => {
  // const dispatch = useAppDispatch()
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

  const handleWordUpdate = () => {
    setUpdate(true)
    setEditClicked(!isEditclicked)
  }

  const handleClickDelete = () => {
    onDelete(id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => {
      return {...prev, [name]: value} 
    })
  }

  const handleUpdateClear = () => {
    if (wordRef.current === null || textRef.current === null) {
      return
    }
    const word = wordRef.current.value
    const text = textRef.current.value
    onUpdate(id, word, text)
    console.log('update')
    setUpdate(false)
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
              : <span>{word}</span>}
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
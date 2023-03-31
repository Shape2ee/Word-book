import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import $ from './main.module.scss'
import Title from '@components/Title';
import Button from '@components/Button';
import Icon from '@components/Icon';
import WordList from '@components/WordList';

const Main = () => {
  const navigate = useNavigate()
  const wordList = useAppSelector((state) => state.word.wordList)
  console.log(wordList)
  const [edit, setEdit] = useState<boolean>(false)
  const [btnIconState, setBtnIconState]= useState<string>('add')
  const [btnTextState, setBtnTextState]= useState<string>('리스트 추가하기')
  const [btnModeState, setBtnModeState] = useState<string>('편집')

  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true)
      setBtnIconState('checkLine')
      setBtnTextState('전체 선택')
      setBtnModeState('완료')
    } else {
      setEdit(false)
      setBtnIconState('add')
      setBtnTextState('리스트 추가하기')
      setBtnModeState('편집')
    }
  }
  
  const handleClickAdd = () => {
    console.log('add')
    navigate('/add')
  }

  const handleAllChecked = () => {
    console.log('handleAllChecked')
  }

  const handelClickDelete = () => {
    console.log('handelClickDelete')
  }

  return (
    <div className={$.main_contianer}>
      <div className={$.title_wrap}>
        <Title text='나만의 단어장' />
        <div className={$.btn_wrap}>
          <Button text={btnTextState} 
            onClick={btnIconState === 'add' ? handleClickAdd : handleAllChecked}
            fillWhite 
          >
            <Icon kinds={btnIconState}/>
          </Button>
          {edit && <Button text='삭제' onClick={handelClickDelete} cercle />}
          <Button text={btnModeState} onClick={handleClickEdit} cercle
            color={btnModeState === '완료' ? true : false}
          />
        </div>
      </div>
      <WordList isEdit={edit} />
    </div>
  );
};

export default Main;
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
  const [btnIconStatus, setBtnIconStatus]= useState<string>('add')
  const [btnTextStatus, setBtnTextStatus]= useState<string>('리스트 추가하기')
  
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true)
      setBtnIconStatus('checkLine')
      setBtnTextStatus('전체 선택')
    } else {
      setEdit(false)
      setBtnIconStatus('add')
      setBtnTextStatus('리스트 추가하기')
    }
  }

  const handleClickAdd = () => {
    console.log('add')
    navigate('/add')
  }

  const handleAllChecked = () => {
    console.log('handleAllChecked')
  }

  return (
    <div className={$.main_contianer}>
      <div className={$.title_wrap}>
        <Title text='나만의 단어장' />
        <div className={$.btn_wrap}>
          <Button text={btnTextStatus} onClick={btnIconStatus === 'add' ? handleClickAdd : handleAllChecked} fill >
            <Icon kinds={btnIconStatus}/>
          </Button>
          <Button text='편집' onClick={handleClickEdit} cercle />
        </div>
      </div>
      <WordList isEdit={edit} />
    </div>
  );
};

export default Main;
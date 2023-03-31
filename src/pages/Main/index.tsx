import React, { useState } from 'react';
import $ from './main.module.scss'
import Title from '@components/Title';
import Button from '@components/Button';
import Icon from '@components/Icon';
import WordList from '@components/WordList';

const Main = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const handleClickAdd = () => {
    console.log('add')
  }

  const handleClickEdit = () => {
    setEdit(!edit)
  }

  return (
    <div className={$.main_contianer}>
      <div className={$.title_wrap}>
        <Title text='나만의 단어장' />
        <div className={$.btn_wrap}>
          <Button text='편집' onClick={handleClickEdit} cercle />
          <Button text={<Icon kinds='add'/>} onClick={handleClickAdd} cercle />
        </div>
      </div>
      <WordList isEdit={edit} />
    </div>
  );
};

export default Main;
import React from 'react';
import $ from './main.module.scss'
import Title from '@components/Title';
import IconButton from '@components/IconButton';
import Button from '@components/Button';
import WordList from '@components/WordList';

const Main = () => {
  const handleClickAdd = () => {
    console.log('add')
  }
  return (
    <div className={$.main_contianer}>
      <div className={$.title_wrap}>
        <Title text='나만의 단어장' />
        <div>
          <IconButton text='편집' onClick={handleClickAdd} cercle />
          <IconButton text='add' icon onClick={handleClickAdd} cercle />
        </div>
      </div>
      <WordList />
    </div>
  );
};

export default Main;
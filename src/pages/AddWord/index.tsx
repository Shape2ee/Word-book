import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from './addWord.module.scss'
import Title from '@components/Title';
import Button from '@components/Button'
import Icon from '@components/Icon';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { addWord } from '@customModules/wordSlice';

const AddWord = () => {
  const wordList = useAppSelector((state) => state.word.wordList)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goBack = () => {
    navigate('../')
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (formData.get('word') === '' 
      || formData.get('wordMeaning') === '') {
      return
    }

    const addWordData = {
      word: formData.get('word'),
      text: formData.get('wordMeaning'),
      example: formData.get('wordExample'),
    }
    dispatch(addWord(addWordData))
    navigate('../')
  }

  return (
    <div className={$.add_container}>
      <div className={$.wrap}>
        <div className={$.title_wrap}>
          <Title text='단어 추가하기'/>
          <Button onClick={goBack}>
            <Icon kinds='back'/>
          </Button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input type={'text'} name='word'
              placeholder='영어 단어를 입력해주세요.'
              />
          </div>
          <div>
            <input type={'text'} name='wordMeaning'
              placeholder='단어의 뜻을 입력해주세요.' />
          </div>
          <div>
            <input type={'text'} name='wordExample'
              placeholder='예문을 입력해주세요.' />
          </div>
          <div className={$.button_wrap}>
            <Button text='취소' width border onClick={goBack}/>
            <Button text='저장' width fillMain />
          </div>
        </form>
        <Button text='영어 단어 검색해보기' onClick={() => console.log('단어 검색')} width border height6 >
          <Icon kinds='search'/>
        </Button>
      </div>
    </div>
  );
};

export default AddWord;

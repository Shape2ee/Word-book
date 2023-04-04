import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from './addWord.module.scss'
import Title from '@components/Title';
import Button from '@components/Button'
import Icon from '@components/Icon';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { add } from '@customModules/wordSlice';

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

    const addWordData = {
      word: formData.get('word'),
      wordMeaning: formData.get('wordMeaning'),
      wordExample: formData.get('wordExample'),
    }
    dispatch(add(addWordData))
    navigate('../')
  }

  useEffect(() => {
    console.log(wordList)
  }, [wordList])

  return (
    <div className={$.add_container}>
      <Title text='단어 추가하기'/>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type={'text'} name='word' placeholder='영어 단어를 입력해주세요.'/>
        </div>
        <div>
          <input type={'text'} name='wordMeaning' placeholder='단어의 뜻을 입력해주세요.' />
        </div>
        <div>
          <input type={'text'} name='wordExample' placeholder='예문을 입력해주세요.' />
        </div>
        <div className={$.button_wrap}>
          <Button text='취소' width border onClick={goBack}/>
          <Button text='저장' width fillMain />
        </div>
        <Button text='영어 단어 검색해보기' width border height6 >
          <Icon kinds='search'/>
        </Button>
      </form>
    </div>
  );
};

export default AddWord;

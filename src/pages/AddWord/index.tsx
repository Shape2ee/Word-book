import React, { FormEvent, useState, useEffect, useRef } from 'react';
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
  const wordInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)

  const goBack = () => {
    navigate('../')
  }

  const goTranslation = () => {
    navigate('./translation')
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (formData.get('word') === '' 
      || formData.get('wordMeaning') === '') {
      return
    }

    const haveWord = wordList.filter((item) => formData.get('word') === item.word)

    if (haveWord.length > 0 
      && wordInputRef.current !== null
      && textInputRef.current !== null) {
      alert('해당 단어는 이미 노트에 있습니다.')
        wordInputRef.current.value = ''
        textInputRef.current.value = ''
      return
    } 

    const addWordData = {
      word: formData.get('word'),
      text: formData.get('wordMeaning'),
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
            ref={wordInputRef}
              placeholder='영어 단어를 입력해주세요.'
              />
          </div>
          <div>
            <input type={'text'} name='wordMeaning'
              ref={textInputRef}
              placeholder='단어의 뜻을 입력해주세요.' />
          </div>
          <div className={$.button_wrap}>
            <div className={$.back_button} onClick={goBack}>취소</div>
            <Button type={'submit'} text='저장' width fillMain />
          </div>
        </form>
        <Button text='영어 단어 검색해보기' onClick={goTranslation} width border height6 >
          <Icon kinds='search'/>
        </Button>
      </div>
    </div>
  );
};

export default AddWord;

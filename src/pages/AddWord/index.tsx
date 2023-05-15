import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from './addWord.module.scss'
import Title from '@components/Title';
import Button from '@components/Button'
import Icon from '@components/Icon';
import Loading from '@pages/Loading';
import { WordListType } from '@customTypes/CustumTypes';
// import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';

const AddWord = () => {
  // const wordList = useAppSelector((state) => state.word.wordList)
  const [wordLIst, setWordList] = useState<WordListType[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const wordInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)

  const goBack = () => {
    navigate('../')
  }

  const goTranslation = () => {
    navigate('./translation')
  }

  
  const getWordList = async () => {
    const res  = await fetcher(METHOD.GET, '/wordList')
    const userId = sessionStorage.getItem('user')
    if (userId === undefined || userId === null) return
    const userList = res.filter((v: WordListType) => v.userId === userId)
    setWordList([...userList])
  }

  useEffect(() => {
    getWordList()
  }, [])


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userId = sessionStorage.getItem('user')
    if (userId === null) {
      alert('로그인을 먼저 해주십시오!')
      navigate('/login')
      return
    }

    const formData = new FormData(e.currentTarget)
    
    if (formData.get('word') === '' 
      || formData.get('wordMeaning') === '') {
      return
    }

    const haveWord = wordLIst.filter((item) => formData.get('word') === item.word)

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
    const {word, text} = addWordData
    const regex = /[^a-z\s]/g
    if (word === null) return 
    const checkAddWord = regex.test(word.toString())
    if (checkAddWord) return

    fetcher(METHOD.POST, '/wordList', {
      word: word,
      text: text,
      userId,
    })
    setLoading(true)
  }

  return (
    <>
    {isLoading ? (
        <Loading go='/' />
      ) : (
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
          </div>
        </div>
      )
    }
    </>
  );
};

export default AddWord;

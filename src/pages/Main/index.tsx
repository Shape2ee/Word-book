import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import $ from './main.module.scss'
import Title from '@components/Title';
import Button from '@components/Button';
import Icon from '@components/Icon';
import WordList from '@components/WordList';
import { deleteWord, readWord } from '@customModules/wordSlice';
import Search from '@components/Search';
import { WordListType } from '@customTypes/CustumTypes';

const Main = () => {
  const [wordList, setWordList] = useState<WordListType[]>([])
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [btnIconState, setBtnIconState]= useState<string>('add')
  const [btnTextState, setBtnTextState]= useState<string>('리스트 추가하기')
  const [btnModeState, setBtnModeState] = useState<string>('편집')
  const [inputValue, setInputValue] = useState<string>('')
  const sessionWordList = localStorage.getItem('WordList')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const getWordList = async () => {
    if (sessionWordList !== null) {
      const wordList = await JSON.parse(sessionWordList)
      dispatch(readWord(wordList))
      setWordList(JSON.parse(sessionWordList))
    }
  }

  useEffect(()=> {
    getWordList()
  }, [])

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
      setCheckedList([])
    }
  }
  
  const handleClickAdd = () => {
    console.log('add')
    navigate('/add')
  }

  const handleAllChecked = () => {
    if (wordList.length <= 0) {
      return
    }
    setCheckedList(wordList.map((item) => item.id))
  }

  const handelClickDelete = () => {
    if (checkedList.length <= 0) {
      return
    }
    console.log('handelClickDelete')
    checkedList.forEach((item) => {
      dispatch(deleteWord(item))
    })
  }
    
  const handleCheckedItem = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      setCheckedList(checkedList.filter((itemId) => itemId !== id))
    }
    console.log(checkedList)
  } 

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')
    if (search === '' || search === null) {
      getWordList()
      return
    }

    if (sessionWordList !== null) {
      const searchFilter = JSON.parse(sessionWordList).filter((v: WordListType) => {
        return v.word.toUpperCase() === search.toString().toUpperCase()
      })
      console.log(wordList, searchFilter)
      setWordList(searchFilter)
    }
  }

  const handleResetSearch = () => {
    setInputValue('')
    getWordList()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  return (
    <>
    <Search value={inputValue} onSubmit={handleFormSubmit} 
     onClick={handleResetSearch} 
     onChange={handleInputChange}
     />
    <div className={$.main_contianer}>
      <div className={$.title_wrap}>
        <Title text='나만의 단어장' />
        <div className={$.btn_wrap}>
          <Button text={btnTextState} 
            onClick={btnIconState === 'add' ? handleClickAdd : handleAllChecked}
            fillWhite 
            color={checkedList.length === 0 ? false : checkedList.length === wordList.length ? true : false}
          >
            <Icon kinds={btnIconState}/>
          </Button>
          {edit && <Button text='삭제' onClick={handelClickDelete} cercle />}
          <Button text={btnModeState} onClick={handleClickEdit} cercle
            color={btnModeState === '완료' ? true : false}
          />
        </div>
      </div>
      <WordList isEdit={edit} wordList={wordList} onChecked={handleCheckedItem} checkedList={checkedList} />
    </div>
    </>
  );
};

export default Main;
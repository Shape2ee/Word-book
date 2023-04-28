import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import $ from './main.module.scss'
import Title from '@components/Title';
import Button from '@components/Button';
import Icon from '@components/Icon';
import WordList from '@components/WordList';
import { deleteWord, updateWord } from '@customModules/wordSlice';
import Search from '@components/Search';
import { WordListType } from '@customTypes/CustumTypes';
import Wrapper from '@components/Wrapper';
import { fetcher } from '@api/Fetcher';
import { METHOD } from '@customTypes/CustumTypes';
// import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000'

const Main = () => {
  // const userId = useAppSelector((state) => state.user.userId)
  // const wordList = useAppSelector((state) => state.word.wordList)
  const [wordList, setWordList] = useState<WordListType[]>([])
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [btnIconState, setBtnIconState]= useState<string>('add')
  const [btnTextState, setBtnTextState]= useState<string>('리스트 추가하기')
  const [btnModeState, setBtnModeState] = useState<string>('편집')
  const [inputValue, setInputValue] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const getWordList = async () => {
    const res  = await fetcher(METHOD.GET, '/wordList')
    const userId = sessionStorage.getItem('user')
    if (userId === undefined) return
    const userList = res.filter((v: WordListType) => v.userId === userId)
    setWordList([...userList])
  }

  useEffect(() => {
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
    if (checkedList.length === wordList.length) {
      setCheckedList([])
      return
    }
    setCheckedList(wordList.map((item) => item.id))
  }

  const handelClickDelete = async () => {
    console.log('handelClickDelete')
    if (checkedList.length <= 0) {
      return
    }
    checkedList.forEach((item) => {
      dispatch(deleteWord(item))
    })
    setCheckedList([])
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
    console.log('handleFormSubmit')
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')
    if (search === '' || search === null) {
      return
    }

    const searchFilter = wordList.filter((v: WordListType) => {
      return v.word.toUpperCase() === search.toString().toUpperCase()
    })
    
    setWordList(searchFilter)
  }

  const handleResetSearch = () => {
    setInputValue('')
    getWordList()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    if (e.target.value === '') {
      getWordList()
    }
  }

  const handleClickDelete = async (id: string) => {
    const userId = sessionStorage.getItem('user')
    const newWordList = await fetcher(METHOD.DELETE, `/wordlist/${id}`, { params: { userId }})
    setWordList((wordList) => {
      const targetIndex = wordList.findIndex(word => word.id === id + '')
      if (targetIndex < 0) return wordList
      if (wordList[targetIndex].userId !== userId) return wordList
      const newWordList = [...wordList]
      newWordList.splice(targetIndex, 1)
      return newWordList
    })
  }
  
  const handleWordUpdate =  async (id: string, word: string, text: string) => {
    console.log('handleUpdateClear')
    const userId = sessionStorage.getItem('user')
    const newWordList = await fetcher(METHOD.PUT, `/wordlist/${id}`, { word, text, userId })
    setWordList((wordList) => {
      const targetIndex = wordList.findIndex(word => word.id === id + '')
      if (targetIndex < 0) return wordList
      if (wordList[targetIndex].userId !== userId) return wordList
      const newWord = {
        ...wordList[targetIndex],
        word: word,
        text: text,
        timetamp: Date.now()
      }
      const newWordList = [...wordList]
      newWordList.splice(targetIndex, 1, newWord)
      return newWordList
    })
  }
  
  return (
    <>
    <Search value={inputValue} onSubmit={handleFormSubmit} 
     onClick={handleResetSearch} 
     onChange={handleInputChange}
     />
    <Wrapper>
      <div className={$.main_contianer}>
        <div className={$.title_wrap}>
          <Title text='단어 노트' />
          <div className={$.btn_wrap}>
            <Button text={btnTextState} mobileNone
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
        <WordList isEdit={edit} 
          wordList={wordList}
          onChecked={handleCheckedItem}
          checkedList={checkedList}
          onDelete={handleClickDelete}
          onUpdate={handleWordUpdate} />
      </div>
    </Wrapper>
    </>
  );
};

export default Main;
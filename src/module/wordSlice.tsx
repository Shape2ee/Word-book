import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store'
import { WordType, WordListType } from '@customTypes/CustumTypes'
// const MOCK_DATA = [
//   {
//     word: 'apple',
//     text: '사과',
//     example: 'i like apple',
//   },
//   {
//     word: 'banana',
//     text: '바나나',
//     example: 'i like banana',
//   },
// ]

// const MOCK_DATA_ARR = Array(10).fill({}).map((v, i) => {
//   const item = MOCK_DATA[Math.floor(Math.random() * 2)]
//   return {
//     id: 10 - i + '',
//     word: item.word,
//     text: item.text,
//     example: item.example,
//     timetamp: 1234567890123 + i,
//   }
// })

interface WordSlice {
  wordList: WordListType[]
}

const initialState: WordSlice = {
  wordList: []
}

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    readWord: (state, action) => {
      state.wordList = [...action.payload]
    },
    addWord: (state, action) => {
      const newWord = {
        id: state.wordList.length + 1 + '',
        word: action.payload.word,
        text: action.payload.text,
        example: action.payload.example,
        timetamp: Date.now(),
      }
      state.wordList.unshift(newWord)
      localStorage.setItem('WordList', JSON.stringify(state.wordList))
    },
    deleteWord: (state, action: PayloadAction<string>) => {
      state.wordList = state.wordList.filter((item) => item.id !== action.payload)
      localStorage.setItem('WordList', JSON.stringify(state.wordList))
    },
    updateWord: (state, action) => {
      const { id, word, text, example } = action.payload
      console.log(action)
      const targetIndex = state.wordList.findIndex((item) => item.id === id)
      if (targetIndex < 0) throw '수정할 단어가 없습니다.'
      const newWord = {...state.wordList[targetIndex], 
        word: word, 
        text: text,
        example: example,
        timetamp: Date.now()
      }
      state.wordList.splice(targetIndex, 1, newWord)
      localStorage.setItem('WordList', JSON.stringify(state.wordList))
    }
  }
})

export const { addWord, deleteWord, updateWord, readWord } = wordSlice.actions;
export const selectWordList = (state: RootState) => state.word.wordList
export default wordSlice.reducer;
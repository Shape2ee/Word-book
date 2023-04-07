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
    addWord: (state, action) => {
      const arrayId = state.wordList.map((item) => Number(item.id))
      const maxId = arrayId.length === 0 ? 0 : Math.max(...arrayId)
      const newWord = {
        id: maxId + 1 + '',
        word: action.payload.word,
        text: action.payload.text,
        timetamp: Date.now(),
      }
      state.wordList.unshift(newWord)
    },
    deleteWord: (state, action: PayloadAction<string>) => {
      state.wordList = state.wordList.filter((item) => item.id !== action.payload)
    },
    updateWord: (state, action) => {
      const { id, word, text } = action.payload
      console.log(action)
      const targetIndex = state.wordList.findIndex((item) => item.id === id)
      if (targetIndex < 0) throw '수정할 단어가 없습니다.'
      const newWord = {...state.wordList[targetIndex], 
        word: word, 
        text: text,
        timetamp: Date.now()
      }
      state.wordList.splice(targetIndex, 1, newWord)
    }
  }
})

export const { addWord, deleteWord, updateWord } = wordSlice.actions;
export const selectWordList = (state: RootState) => state.word.wordList
export default wordSlice.reducer;
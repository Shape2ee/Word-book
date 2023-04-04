import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

const MOCK_DATA = [
  {
    word: 'apple',
    text: '사과',
    example: 'i like apple',
  },
  {
    word: 'banana',
    text: '바나나',
    example: 'i like banana',
  },
]

const MOCK_DATA_ARR = Array(10).fill({}).map((v, i) => {
  const item = MOCK_DATA[Math.floor(Math.random() * 2)]
  return {
    id: 10 - i + '',
    word: item.word,
    text: item.text,
    example: item.example,
    timetamp: 1234567890123 + i,
  }
})

interface wordList {
  id: string,
  word: string,
  text: string,
  example: string,
  timetamp: number,
}

interface wordSlice {
  wordList: wordList[]
}

const initialState = {
  wordList: MOCK_DATA_ARR
}

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    add: (state, action) => {
      const newWord = {
        id: state.wordList.length + 1 + '',
        word: action.payload.word,
        text: action.payload.wordMeaning,
        example: action.payload.wordExample,
        timetamp: Date.now(),
      }
      state.wordList.unshift(newWord)
      
      // state.wordList.push(action.payload)
      // console.log(state.wordList)
    }
  }
})

export const { add } = wordSlice.actions;
export const selectWordList = (state: RootState) => state.word.wordList
export default wordSlice.reducer;
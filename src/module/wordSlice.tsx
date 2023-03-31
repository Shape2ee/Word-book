import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

interface wordList {
  id: number
  text: string
}

interface wordSlice {
  wordList: wordList[]
}

const initialState = {
  wordList: []
}

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(state, action)
    }
  }
})

export const { add } = wordSlice.actions;
export const selectWordList = (state: RootState) => state.word.wordList
export default wordSlice.reducer;
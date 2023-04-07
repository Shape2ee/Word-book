import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

interface gameState {
  number: number
}

const initialState: gameState = {
  number: 0
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    countNumber: (state, action: PayloadAction<number>) => {
      state.number = action.payload
    }
  }
})

export const { countNumber } = gameSlice.actions
export const selectNumber = (state: RootState) => state.game.number
export default gameSlice.reducer
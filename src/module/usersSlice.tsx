import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

interface userState {
  userId: string
}

const initialState : userState = {
  userId: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    }
  }
})

export const { setUserId } = userSlice.actions
export const selectUser = (state: RootState) => state.user.userId
export default userSlice.reducer
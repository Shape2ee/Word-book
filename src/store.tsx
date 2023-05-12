import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import wordSlice from '@customModules/wordSlice'
import gameSlice from '@customModules/gameSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root', // localstorage key
  storage, // localstorage
  whilelist: ['word']
}

const reducers = combineReducers({
  // word: wordSlice,
  game: gameSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
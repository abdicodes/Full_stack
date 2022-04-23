import { configureStore } from '@reduxjs/toolkit'
import reducer from './anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: reducer,
  },
})
console.log(store)

export default store

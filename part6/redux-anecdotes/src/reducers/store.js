import { configureStore } from '@reduxjs/toolkit'
import ancedoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: ancedoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
})

export default store

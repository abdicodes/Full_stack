import { configureStore } from '@reduxjs/toolkit'
import ancedoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: ancedoteReducer,
    notifications: notificationReducer,
  },
})

export default store

import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsReducer'
import blogsReducer from './blogsReducer'

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
  },
})

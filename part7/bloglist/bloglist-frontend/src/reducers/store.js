import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

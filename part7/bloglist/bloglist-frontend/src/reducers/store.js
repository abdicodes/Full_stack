import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

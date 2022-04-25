import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsReducer'

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
})

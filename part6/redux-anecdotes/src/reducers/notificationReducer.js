import { createSlice } from '@reduxjs/toolkit'
const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    addTimeOut(state, action) {
      return initialState
    },
  },
})

export const { addNotification, addTimeOut } = notificationSlice.actions
export default notificationSlice.reducer

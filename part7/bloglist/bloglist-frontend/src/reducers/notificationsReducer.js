import { createSlice } from '@reduxjs/toolkit'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
  },
})

let timeOut = null

export const createNotification = (notification) => {
  return (dispatch) => {
    console.log(notification)
    dispatch(addNotification(notification))
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      dispatch(addNotification(null))
    }, 5000)
  }
}

export default notificationsSlice.reducer
export const { addNotification } = notificationsSlice.actions

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
export const voteNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch(addNotification(`you voted for ${content}`))
    setTimeout(() => {
      dispatch(addTimeOut())
    }, seconds * 1000)
  }
}
export const newAnecdoteNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch(addNotification(`${content} has been successfully added!`))
    setTimeout(() => {
      dispatch(addTimeOut())
    }, seconds * 1000)
  }
}

export const { addNotification, addTimeOut } = notificationSlice.actions
export default notificationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
const initialState = { message: null, timeOutID: null }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      clearTimeout(state.timeOutID)

      return {
        message: action.payload.message,
        timeOutID: action.payload.timeOutID,
      }
    },
    addTimeOut(state, action) {
      return initialState
    },
  },
})
export const voteNotification = (content, seconds) => {
  return (dispatch) => {
    const timeOut = setTimeout(() => {
      dispatch(addTimeOut())
    }, seconds * 1000)
    dispatch(
      addNotification({
        message: `you voted for ${content} `,
        timeOutID: timeOut,
      })
    )
  }
}
export const newAnecdoteNotification = (content, seconds) => {
  return (dispatch) => {
    const timeOut = setTimeout(() => {
      dispatch(addTimeOut())
    }, seconds * 1000)
    dispatch(
      addNotification({
        message: `${content} has been successfully added!`,
        timeOutID: timeOut,
      })
    )
  }
}

export const { addNotification, addTimeOut } = notificationSlice.actions
export default notificationSlice.reducer

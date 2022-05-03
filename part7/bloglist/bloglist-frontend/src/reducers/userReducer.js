import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationsReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
  },
})

export const userInfo = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(addUser(user))
    } catch (error) {
      dispatch(
        createNotification({ message: 'Wrong credentials', severity: 'error' })
      )
    }
  }
}
export const checkLocalstorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)
      dispatch(addUser(user))
    }
  }
}
export const logOut = () => {
  return (dispatch) => {
    dispatch(addUser(null))
    window.localStorage.removeItem('loggedNoteappUser')
  }
}

export const { addUser } = userSlice.actions

export default userSlice.reducer

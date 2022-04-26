import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const users = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    fetchUsers(state, action) {
      return action.payload
    },
  },
})
export const fetchAllUsers = () => {
  return async (dispatch) => {
    const allUSers = await axios.get('/api/users')
    console.log(allUSers.data)
    dispatch(fetchUsers(allUSers.data))
  }
}

export const { fetchUsers } = users.actions
export default users.reducer

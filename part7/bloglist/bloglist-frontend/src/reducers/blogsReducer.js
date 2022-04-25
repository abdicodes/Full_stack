import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      return state.concat(action.payload)
    },
  },
})

export const { addBlogs, newBlog } = blogsSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const a = await blogs.getAll()
    dispatch(addBlogs(a))

    return a
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const a = await blogs.create(blog)
    console.log(a)
    dispatch(newBlog(a))
  }
}

export default blogsSlice.reducer

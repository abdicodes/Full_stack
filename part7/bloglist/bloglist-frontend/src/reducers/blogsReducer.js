import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    deletingBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { addBlogs, newBlog, updateBlog, deletingBlog } = blogSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const a = await blogs.getAll()
    dispatch(addBlogs(a))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const a = await blogs.create(blog)

    dispatch(newBlog(a))
  }
}
export const addLike = (blog) => {
  return async (dispatch) => {
    const a = await blogs.modify(blog.id, blog)

    dispatch(updateBlog(a))
  }
}
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogs.deleteBlog(id)

    dispatch(deletingBlog(id))
  }
}
export default blogSlice.reducer

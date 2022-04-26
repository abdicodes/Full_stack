import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/blogList'
import UserBlogs from './UserBlogs'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationsReducer'
import { fetchBlogs, createBlog } from './reducers/blogsReducer'
import { checkLocalstorage, logOut } from './reducers/userReducer'
import { fetchAllUsers } from './reducers/usersReducer'
import Users from './components/Users'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(checkLocalstorage())
    dispatch(fetchAllUsers())
  }, [])

  const blogFormHandler = (blogObject) => {
    try {
      dispatch(
        createBlog({
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
        })
      )

      dispatch(
        createNotification({
          message: `${blogObject.title} by ${blogObject.author} is added!`,
          color: 'green',
        })
      )
    } catch ({ response }) {
      dispatch(
        createNotification({ message: response.data.error, color: 'red' })
      )
    }
  }

  const logout = () => {
    dispatch(logOut())
  }

  return (
    <>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} has logged in</p>

          <Routes>
            <Route path="/blogs" element={<BlogList user={user} />} />
            <Route path="/" element={null} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserBlogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>

          <button onClick={logout}>logout</button>
          <Togglable buttonLabel={'new blog'}>
            {' '}
            <BlogForm createBlog={blogFormHandler} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>Login in to application</h2>
          <Notification />
          <Togglable buttonLabel={'login'}>
            <LoginForm />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

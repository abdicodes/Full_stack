import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationsReducer'
import { fetchBlogs, createBlog } from './reducers/blogsReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogList = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogList].sort((a1, a2) => a2.likes - a1.likes)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(
        createNotification({ message: 'Wrong credentials', color: 'red' })
      )
    }
  }
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
  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

      dispatch(
        createNotification({
          message: 'blog has successfuly been deleted',
          color: 'green',
        })
      )
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, color: 'red' })
      )
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  const addNewLike = async (object) => {
    const updatedBlog = await blogService.modify(object.id, object)
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

  return (
    <>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} has logged in</p>{' '}
          <button onClick={logout}>logout</button>
          <div className="blogs-list">
            {sortedBlogs
              .sort((a, b) =>
                a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0
              )
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  newLike={addNewLike}
                  user={user}
                  removeBlog={removeBlog}
                />
              ))}
          </div>
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
            <LoginForm loginUser={handleLogin} />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

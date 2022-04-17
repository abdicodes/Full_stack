import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogFormHandler = async (blogObject) => {
    try {
      const create = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      setBlogs(() => blogs.concat(create))
      setConfirmMessage(`${create.title} by ${create.author} is added!`)
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000)
    } catch ({ response }) {
      setErrorMessage(response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <Notification message={confirmMessage} color="green" />
          <Notification message={errorMessage} color="red" />
          <p>{user.name} has logged in</p>{' '}
          <button onClick={logout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Togglable buttonLabel={'new blog'}>
            {' '}
            <BlogForm createBlog={blogFormHandler} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>Login in to application</h2>
          <Notification message={errorMessage} color="red" />
          <Togglable buttonLabel={'login'}>
            <LoginForm loginUser={handleLogin} />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

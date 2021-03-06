import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.map(
          (blog) =>
            (blog = {
              author: blog.author,
              title: blog.title,
              id: blog.id,
              likes: blog.likes,
              url: blog.url,
              user: blog.user.id,
            })
        )
      )
    )
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
  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setConfirmMessage('blog has successfuly been deleted')
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          <Notification
            message={confirmMessage}
            color="green"
            messageClass="confirm"
          />
          <Notification
            message={errorMessage}
            color="red"
            messageClass="error"
          />
          <p>{user.name} has logged in</p>{' '}
          <button onClick={logout}>logout</button>
          <div className="blogs-list">
            {blogs
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
          <Notification
            message={errorMessage}
            color="red"
            messageClass="error"
          />
          <Togglable buttonLabel={'login'}>
            <LoginForm loginUser={handleLogin} />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

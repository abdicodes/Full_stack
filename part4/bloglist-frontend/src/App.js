import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const ref = useRef()

  // const [author, setAuthor] = useState('')
  // const [title, setTitle] = useState('')
  // const [url, setUrl] = useState('')
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
      console.log('hello')
      const user = await loginService.login(userObject)
      console.log(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // const blogFormHandler = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const create = await blogService.create({
  //       title: title,
  //       author: author,
  //       url: url,
  //     })

  //     setAuthor('')
  //     setTitle('')
  //     setUrl('')
  //     setBlogs(() => blogs.concat(create))
  //     setConfirmMessage(`${create.title} by ${create.author} is added!`)
  //     setTimeout(() => {
  //       setConfirmMessage(null)
  //     }, 5000)
  //   } catch (error) {}
  // }

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
          <p>{user.name} has logged in</p>{' '}
          <button onClick={logout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {/* <div>{createBlogForm()}</div> */}
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

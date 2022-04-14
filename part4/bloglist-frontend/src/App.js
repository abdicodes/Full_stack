import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
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
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogFormHandler = async (event) => {
    event.preventDefault()
    try {
      const create = await blogService.create({
        title: title,
        author: author,
        url: url,
      })

      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(() => blogs.concat(create))
      setConfirmMessage(`${create.title} by ${create.author} is added!`)
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000)
    } catch (error) {}
  }
  const createBlogForm = () => (
    <form onSubmit={blogFormHandler}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

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
          <div>{createBlogForm()}</div>
        </div>
      ) : (
        <div>
          <h2>Login in to application</h2>
          <Notification message={errorMessage} color="red" />
          {loginForm()}
        </div>
      )}
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationsReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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
      dispatch(
        createNotification({ message: 'Wrong credentials', color: 'red' })
      )
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

      dispatch(
        createNotification({
          message: `${create.title} by ${create.author} is added!`,
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
      console.log(error)
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

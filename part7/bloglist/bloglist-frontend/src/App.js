import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationsReducer'
import {
  fetchBlogs,
  createBlog,
  addLike,
  deleteBlog,
} from './reducers/blogsReducer'
import { checkLocalstorage, logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogList = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const sortedBlogs = [...blogList].sort((a1, a2) => a2.likes - a1.likes)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(checkLocalstorage())
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
  const removeBlog = async (id) => {
    try {
      dispatch(deleteBlog(id))

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
    dispatch(logOut())
  }
  const addNewLike = async (object) => {
    dispatch(addLike(object))
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
            <LoginForm />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

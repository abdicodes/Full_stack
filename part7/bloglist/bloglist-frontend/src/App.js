import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/blogList'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
// import { createNotification } from './reducers/notificationsReducer'
import { fetchBlogs, createBlog } from './reducers/blogsReducer'
import { checkLocalstorage } from './reducers/userReducer'
import { fetchAllUsers } from './reducers/usersReducer'
import Users from './components/Users'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import theme from './assets/theme'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Card, CardHeader, CardContent, CssBaseline } from '@mui/material/'
const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(checkLocalstorage())
    dispatch(fetchAllUsers())
  }, [])

  const blogFormHandler = (blogObject) => {
    dispatch(
      createBlog({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })
    )
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user !== null ? (
          <Box
            className="blogs-list"
            height="100vh"
            display="flex"
            flexDirection="column"
            // justifyContent="center"
            alignItems="center"
          >
            <NavBar user={user} />
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
            <Togglable buttonLabel={'new blog'}>
              <BlogForm createBlog={blogFormHandler} />
            </Togglable>
          </Box>
        ) : (
          <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Notification />
            <Card style={{ maxWidth: '50%', alignSelf: 'center' }}>
              <CardHeader title="Login in to application" />
              <CardContent>
                <Togglable buttonLabel={'login'}>
                  <LoginForm />
                </Togglable>
              </CardContent>
            </Card>
          </Box>
        )}
      </ThemeProvider>
    </>
  )
}

export default App

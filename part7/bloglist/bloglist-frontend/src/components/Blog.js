import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog, addComment } from '../reducers/blogsReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import {
  Button,
  TextField,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'

const Blog = () => {
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const removeBlog = () => {
    const popUp = window.confirm('are you sure you want to delete the blog')
    if (popUp) {
      dispatch(deleteBlog(blog.id))
      navigate('/blogs')
    }
  }

  const addNewLike = () => {
    dispatch(addLike(blog))
  }
  if (!blog || !user) {
    return null
  }
  const comment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
  }
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Grid
        item
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card elevation={3} style={{ minheight: '70%' }}>
          <CardHeader title={`Title: ${blog.title}`} />
          <CardContent>
            <Typography> Author: {blog.author}</Typography>
            <Typography> URL: {blog.url}</Typography>
            <Typography> likes: {blog.likes}</Typography>
            <CardActions>
              <Button variant="outlined" onClick={addNewLike}>
                Like
              </Button>

              {user.id === blog.user.id && (
                <Button
                  variant="outlined"
                  className="delete-button"
                  onClick={removeBlog}
                >
                  Delete blog
                </Button>
              )}
            </CardActions>
            <Typography>comments</Typography>
            <ul>
              {blog.comments.map((comment, i) => (
                <Typography key={i}>{comment}</Typography>
              ))}
            </ul>
            <form onSubmit={comment} id="add-comments">
              <TextField
                size="small"
                name="comment"
                type="text"
                label="add a comment"
                style={{ marginRight: '20px' }}
              />
              <Button variant="contained" type="submit">
                submit
              </Button>
            </form>
          </CardContent>
        </Card>
        <Box></Box>
      </Grid>
    </Box>
  )
}

export default Blog

import { useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const blogFormHandler = (event) => {
    event.preventDefault()
    createBlog({ author: author, title: title, url: url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={blogFormHandler}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            id="title"
            value={title}
            label="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            id="author"
            value={author}
            label="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            id="url"
            value={url}
            label="url"
            onChange={({ target }) => setUrl(target.value)}
          />

          <Button id="submit-blog" type="submit" variant="contained">
            {' '}
            create
          </Button>
        </Box>
      </form>
    </div>
  )
}
export default BlogForm

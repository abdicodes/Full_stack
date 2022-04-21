import { useState } from 'react'
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
        <div>
          title
          <input
            id="title"
            type="text"
            placeholder="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            id="url"
            placeholder="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-blog" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
export default BlogForm

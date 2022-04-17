import React, { useState } from 'react'
const Blog = ({ blog, newLike }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const viewHandler = (event) => {
    event.preventDefault()
    setView(!view)
  }
  const text = { text: view ? 'hide' : 'view' }
  const addLikes = (event) => {
    event.preventDefault()
    const myObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
    }
    newLike(myObject)
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} <button onClick={viewHandler}> {text.text}</button>
      </p>
      {view && <p>{blog.url}</p>}
      {view && (
        <p>
          {blog.likes} <button onClick={addLikes}>likes</button>
        </p>
      )}
      {view && <p>{blog.author}</p>}
    </div>
  )
}
export default Blog

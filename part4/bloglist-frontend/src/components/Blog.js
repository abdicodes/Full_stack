import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const viewHandler = (e) => {
    e.preventDefault()
    setView(!view)
    console.log(e.target)
  }
  const text = () => {
    if (view) {
      return 'hide'
    } else {
      return 'view'
    }
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} <button onClick={viewHandler}> {text()}</button>
      </p>
      {view && <p>{blog.url}</p>}
      {view && (
        <p>
          {blog.likes} <button>likes</button>
        </p>
      )}
      {view && <p>{blog.author}</p>}
    </div>
  )
}
export default Blog

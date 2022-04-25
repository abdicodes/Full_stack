import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, newLike, user, removeBlog }) => {
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

  const buttonText = { text: view ? 'hide' : 'view' }
  const addLikes = (event) => {
    event.preventDefault()
    const myObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user,
      id: blog.id,
    }
    newLike(myObject)
  }
  const deleteBlog = () => {
    const popUp = window.confirm('are you sure you want to delete the blog')
    if (popUp) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <p>
        {blog.title}{' '}
        <button className="view-hide-button" onClick={viewHandler}>
          {' '}
          {buttonText.text}
        </button>
      </p>

      {view && (
        <>
          {' '}
          <p>{blog.url}</p>
          <p className="likes">
            <span className="likesNum"> {blog.likes}</span>{' '}
            <button className="like-button" onClick={addLikes}>
              likes
            </button>
          </p>
          <p>{blog.author}</p>
          {user.id === blog.user.id && (
            <button className="delete-button" onClick={deleteBlog}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  )
}
Blog.propTypes = {
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  newLike: PropTypes.func.isRequired,
}
export default Blog

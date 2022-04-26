import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log(blog.user.id, user.id)

  const viewHandler = (event) => {
    event.preventDefault()
    setView(!view)
  }

  const removeBlog = () => {
    const popUp = window.confirm('are you sure you want to delete the blog')
    if (popUp) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const buttonText = { text: view ? 'hide' : 'view' }

  const addNewLike = () => {
    dispatch(addLike(blog))
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
            <button className="like-button" onClick={addNewLike}>
              likes
            </button>
          </p>
          <p>{blog.author}</p>
          {user.id === blog.user.id && (
            <button className="delete-button" onClick={removeBlog}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog

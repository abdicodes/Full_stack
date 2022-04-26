import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { useMatch, useNavigate } from 'react-router-dom'

const Blog = () => {
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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
  return (
    <div style={blogStyle} className="blog">
      <p>{blog.title} </p>

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
    </div>
  )
}

export default Blog

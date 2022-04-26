import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogList = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogList].sort((a1, a2) => a2.likes - a1.likes)

  return (
    <div className="blogs-list">
      <ul>
        {sortedBlogs
          .sort((a, b) => (a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0))
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList

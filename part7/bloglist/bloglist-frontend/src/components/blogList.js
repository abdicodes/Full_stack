import Blog from './Blog'

import { useSelector } from 'react-redux'

const BlogList = (props) => {
  const blogList = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogList].sort((a1, a2) => a2.likes - a1.likes)

  return (
    <div className="blogs-list">
      {sortedBlogs
        .sort((a, b) => (a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={props.user} />
        ))}
    </div>
  )
}

export default BlogList

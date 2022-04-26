import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserBlogs = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === match.params.id)
  if (!user) {
    return null
  }
  return (
    <div>
      <div>
        <h1>{user.name}</h1>
      </div>
      <div>
        <h2> added blogs</h2>
        <ul>
          {user.blogs.map((blog, i) => (
            <li key={i}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default UserBlogs

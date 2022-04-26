import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>
                <Link to={`/users/${user.id}`}> {user.name} </Link>
              </td>

              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

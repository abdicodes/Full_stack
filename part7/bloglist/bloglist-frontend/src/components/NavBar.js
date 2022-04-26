import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  }
  return (
    <div>
      <Link to={'/blogs'}>blogs </Link>
      <Link to={'/users'}>users </Link>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default NavBar

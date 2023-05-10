import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const linkstyle = {
    padding: 3
  }

  return (
    <div style={{ backgroundColor: 'lightgray', padding: 3 }}>
      <Link style={linkstyle} to="/">Blogs</Link>
      <Link style={linkstyle} to="/users">Users</Link>
      {user.name} logged in
      <button style={{ marginLeft: 3 }} onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
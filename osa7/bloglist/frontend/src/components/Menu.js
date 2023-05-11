import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { Nav, Navbar, Button, NavbarBrand } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const linkstyle = {
    padding: 3,
  }

  /*return (
    <div style={{ backgroundColor: 'lightgray', padding: 3 }}>
      <Link style={linkstyle} to="/">Blogs</Link>
      <Link style={linkstyle} to="/users">Users</Link>
      {user.name} logged in
      <button style={{ marginLeft: 3 }} onClick={handleLogout}>logout</button>
    </div>
  )*/

  /*return (
    <div>
      <Link style={linkstyle} to="/">Blogs</Link>
      <Link style={linkstyle} to="/users">Users</Link>
      {user.name} logged in
      <button style={{ marginLeft: 3 }} onClick={handleLogout}>logout</button>
    </div>
  )*/

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand>Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user.name} logged in <Link onClick={handleLogout}>Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu

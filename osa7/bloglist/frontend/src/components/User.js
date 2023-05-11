import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const userToShow = useSelector(s => s.userlist).find(u => u.id === id)

  if (!userToShow) {
    return null
  }

  /*return (
    <div>
      <h2>User: {userToShow.name}</h2>
      <h4>added blogs:</h4>
      <ul>
        {userToShow.blogs.map(b => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )*/

  return (
    <div>
      <h2>User: {userToShow.name}</h2>
      <h4>added blogs:</h4>
      <ListGroup>
      {userToShow.blogs.map(b => (
          <ListGroup.Item key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User

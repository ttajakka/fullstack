import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const userToShow = useSelector(s => s.userlist).find(u => u.id === id)

  if (!userToShow) {
    return null
  }

  return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToShow.blogs.map(b => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const userToShow = useSelector(state => state.userlist).find(u => u.id == id)

  if (!userToShow) {
    return null
  }

  return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToShow.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Userlist = () => {
  const userlist = useSelector(state => state.userlist)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map(u => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist

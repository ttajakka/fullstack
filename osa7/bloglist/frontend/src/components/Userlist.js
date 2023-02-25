import { useState, useEffect } from 'react'
import userService from '../services/users'

const Userlist = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

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
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist

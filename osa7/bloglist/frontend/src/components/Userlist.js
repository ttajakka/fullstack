import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUserlist } from '../reducers/userlistReducer'

const Userlist = () => {
  const userlist = useSelector(state => state.userlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUserlist())
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
          {userlist.map(u => (
            <tr key={u.id}>
              <td><a>{u.name}</a></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  return (
    <div>
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          dispatch(logout())
          navigate('/')
        }}
      >
        logout
      </button>
    </div>
  )
}

export default LoggedUser

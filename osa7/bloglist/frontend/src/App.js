import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import storageService from './services/storage'

import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from './reducers/infoReducer'
import { initializeBlogs, setBlogs } from './reducers/blogsReducer'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Bloglist from './components/Bloglist'

const App = () => {
  const [user, setUser] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      dispatch(notifyWith('welcome!'))
    } catch (e) {
      dispatch(notifyWith('wrong username or password', 'error'))
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    dispatch(notifyWith('logged out'))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog hide={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <Bloglist
        user={user}
      />
    </div>
  )
}

export default App
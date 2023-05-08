import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUserlist } from './reducers/userlistReducer'

import LoginForm from './components/Login'
import Menu from './components/Menu'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Bloglist from './components/Bloglist'
import Blog2 from './components/Blog2'
import Userlist from './components/Userlist'
import User from './components/User'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlog hide={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <Bloglist />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUserlist())
  }, [])

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <Menu user={user} />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Userlist />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog2 />} />
      </Routes>
    </Router>
  )
}

export default App

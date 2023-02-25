import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logout } from './reducers/userReducer'

import LoginForm from './components/Login'
import LoggedUser from './components/LoggedUser'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Bloglist from './components/Bloglist'
import Userlist from './components/Userlist'
import User from './components/User'

// const LoggedUser = () => {
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.user)

//   return (
//     <div>
//       <p>{user.name} logged in</p>
//       <button onClick={() => dispatch(logout())}>logout</button>
//     </div>
//   )
// }

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog hide={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <Bloglist />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

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
      <h2>blogs</h2>
      <Notification />
      <LoggedUser />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Userlist />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App

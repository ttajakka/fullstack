import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import { useDispatch, useSelector } from 'react-redux'
import { setInfo, notifyWith } from './reducers/infoReducer'
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

  // useEffect(() => {
  //   blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
  // }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // const notifyWith = (message, type = 'info') => {
  //   dispatch(
  //     setInfo({
  //       message,
  //       type,
  //     })
  //   )

  //   setTimeout(() => {
  //     dispatch(setInfo({ message: null }))
  //   }, 3000)
  // }

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

  // const createBlog = async newBlog => {
  //   const createdBlog = await blogService.create(newBlog)
  //   notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
  //   dispatch(setBlogs(blogs.concat(createdBlog)))
  //   blogFormRef.current.toggleVisibility()
  // }

  const like = async blog => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`))
    setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog.id)
      dispatch(notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`))
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
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
        like={like}
        remove={remove}
      />
    </div>
  )
}

export default App

/*
<div>
        {[...blogs].sort(byLikes).map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
*/
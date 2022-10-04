import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [succMes, setSuccMes] = useState(null)
  const [errorMes, setErrorMes] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccMes('Login successful')
      setTimeout(() => {
        setSuccMes(null)
      }, 5000)
    } catch (exception) {
      setErrorMes('Wrong username or password')
      setTimeout(() => {
        setErrorMes(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    
    setSuccMes('Logout successful')
    setTimeout(() => {
      setSuccMes(null)
    }, 5000)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccMes(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccMes(null)
      }, 5000)
    })
    .catch(error => {
      if (error.response.status === 400) {
        setErrorMes('Unable to add blog. Title and url are required.')
        setTimeout(() => {
          setErrorMes(null)
        }, 5000)
      }
    })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
      .remove(blog.id)
      .then(() => {
        blogService
          .getAll()
          .then(blogs => setBlogs(blogs))  
      })
      .catch(error => {
        setErrorMes('Removing not authorized')
        setTimeout(() => {
          setErrorMes(null)
        }, 5000)
      })
    }
}

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <SuccessMessage message={succMes}/>
      <ErrorMessage message={errorMes}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )

  const showBlogList = () => (
    <div>
      <h2>blogs</h2>
      <SuccessMessage message={succMes}/>
      <ErrorMessage message={errorMes}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        showBlogList()
      }
    </div>
  )
}

export default App
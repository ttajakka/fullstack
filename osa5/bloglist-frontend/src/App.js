import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    
    setSuccMes('Logout successful')
    setTimeout(() => {
      setSuccMes(null)
    }, 5000)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const blogObject = { 
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')

        setSuccMes(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`)
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

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="new blog title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="new blog author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="new blog url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button>create</button>
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
      <Togglable buttonLabel='create new'>
        <BlogForm createBlog={handleCreateBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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
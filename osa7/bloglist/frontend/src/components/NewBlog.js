import { useState } from 'react'
import { useDispatch  } from 'react-redux'
//import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogsReducer'
//import { setInfo } from '../reducers/infoReducer'
import { notifyWith } from '../reducers/infoReducer'

const BlogForm = ({ hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    //const newBlog = await blogService.create({ title, author, url })
    //dispatch(addBlog(newBlog))

    // dispatch(setInfo(`A new blog '${newBlog.title}' by '${newBlog.author}' added`))
    // setTimeout(() => {
    //   dispatch(setInfo({ message: null }))
    // }, 3000)

    event.preventDefault()
    dispatch(addBlog({ title, author, url }))
    dispatch(notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`))
    
    setTitle('')
    setAuthor('')
    setUrl('')
    hide()
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id='title'
            placeholder='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            placeholder='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            placeholder='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

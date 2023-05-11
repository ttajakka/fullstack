import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { initializeUserlist } from '../reducers/userlistReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
    hide()
  }

  /*return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )*/

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />

          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />

          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm

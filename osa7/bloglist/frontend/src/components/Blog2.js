import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { likeBlog, addComment, removeBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(b => b.id == id)
  const loggeduser = useSelector(state => state.user)

  const handleDelete = () => {
    dispatch(removeBlog(blog))
    navigate('/')
  }

  const handleComment = async event => {
    event.preventDefault()
    dispatch(addComment({ id, comment }))
    setComment('')
  }

  const style = {
    //marginTop: 5,
    //marginBottom: 2,
    //padding: 5,
    //borderStyle: 'solid',
    //borderRadius: 7,
    //borderWidth: 1,
  }

  if (!blog || !loggeduser) {
    return null
  }

  const canRemove = loggeduser.username === blog.user.username
  return (
    <div style={style} className="blog">
      <h2>{blog.title}</h2>
      <h3>by {blog.author}</h3>

      <div>
        <div>
          <a href={blog.url}>
            {blog.url}
          </a>
        </div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <div>added by {blog.user && blog.user.name}</div>
        {canRemove && <button onClick={handleDelete}>delete</button>}
      </div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((com, index) => (
          <li key={index}>{com}</li>
        ))}
      </ul>
    </div>
  )
}

export default blog

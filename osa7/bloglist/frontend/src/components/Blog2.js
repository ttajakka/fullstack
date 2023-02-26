import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(b => b.id == id)
  const loggeduser = useSelector(state => state.user)

  const handleDelete = () => {
    dispatch(removeBlog(blog))
    navigate('/')
  }

  const style = {
    marginTop: 5,
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 7,
    borderWidth: 1,
  }

  if (!blog || !loggeduser) {
    return null
  }

  const canRemove = loggeduser.username === blog.user.username
  return (
    <div style={style} className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <div>
          {' '}
          <a href={blog.url}> {blog.url}</a>{' '}
        </div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {canRemove && <button onClick={handleDelete}>delete</button>}
      </div>
    </div>
  )
}

export default blog

import { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const Blog = ({ blog, canRemove }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const style = {
    marginTop: 5,
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 7,
    borderWidth: 1,
  }

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author} {' '}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible && (
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
          {canRemove && (
            <button onClick={() => dispatch(removeBlog(blog))}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

//() => dispatch(likeBlog(blog))

Blog.propTypes = {
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
}

export default Blog

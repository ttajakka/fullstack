import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showShort, setShowShort] = useState(true)

  const toggleShowShort = () => {
    setShowShort(!showShort)
  }

  const showWhenShort = { display: showShort ? '' : 'none' }
  const hideWhenShort = { display: showShort ? 'none' : '' }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.author,
      likes: blog.likes + 1,
      user: blog.user._id
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='titleAuthor'>{blog.title} {blog.author}
        <button style={showWhenShort} onClick={toggleShowShort}>view</button>
        <button style={hideWhenShort} onClick={toggleShowShort}>hide</button>
      </div>
      <div className='urlLikesUserRemove' style={hideWhenShort}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
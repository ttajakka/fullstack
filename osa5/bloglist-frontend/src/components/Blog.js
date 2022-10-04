import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [likes, setLikes] = useState(blog.likes)
  const [showShort, setShowShort] = useState(true)

  const toggleShowShort = () => {
    setShowShort(!showShort)
  }

  const showWhenShort = { display: showShort ? '' : 'none'}
  const hideWhenShort = { display: showShort ? 'none' : ''}

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.author,
      likes: likes + 1,
      user: blog.user._id
    }

    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setLikes(likes+1)
      })
  }

  const handleRemove = () => {
    removeBlog(blog)
  }
  
  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}
        <button style={showWhenShort} onClick={toggleShowShort}>view</button>
        <button style={hideWhenShort} onClick={toggleShowShort}>hide</button>
      </div>
      <div style={hideWhenShort}>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
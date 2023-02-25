import { useSelector } from 'react-redux'
import Blog from './Blog'

const Bloglist = ({ user, like }) => {
  const blogs = useSelector(state => state.blogs)
  
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {[...blogs].sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          canRemove={user && blog.user.username === user.username}
        />
      ))}
    </div>
  )
}

export default Bloglist

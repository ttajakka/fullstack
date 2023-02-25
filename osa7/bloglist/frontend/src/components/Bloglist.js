import { useSelector } from 'react-redux'
import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div>
      {blogs.map(blog => (
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

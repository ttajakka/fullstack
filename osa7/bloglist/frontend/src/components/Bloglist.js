import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

  const style = {
    marginTop: 5,
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
  }

  return (
    <div>
      {blogs.map(blog => (
        <div style={style} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>
      ))}
    </div>
  )
}

// return (
//   <div>
//     {blogs.map(blog => (
//       <Blog
//         key={blog.id}
//         blog={blog}
//         canRemove={user && blog.user.username === user.username}
//       />
//     ))}
//   </div>
// )

export default Bloglist

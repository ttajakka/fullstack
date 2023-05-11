import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

  /*
  const style = {
    marginTop: 5,
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 3,
    borderWidth: 1,
  }

  return (
    <div>
      {blogs.map(blog => (
        <div style={style} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>
      ))}
    </div>
  ) */

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th><th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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

const lodash = require('lodash')

//const dummy = (blogs) => {
//  return 1
//}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => { return total + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return undefined }

  const likes = blogs.map(blog => blog.likes)
  const max = Math.max(...likes)
  const fav = blogs.find(blog => blog.likes === max)
  const favorite = {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return undefined }

  const authCount = lodash.countBy(blogs.map(blog => blog.author))
  const max = Math.max(...Object.values(authCount))
  const most = Object.entries(authCount).find(e => e[1] === max)
  return { author: most[0], blogs: most[1] }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return undefined }

  const authors = lodash.uniq(blogs.map(blog => blog.author))

  const totalLikes = authors.map(author =>
    blogs.reduce((likes, blog) => {
      return blog.author === author
        ? likes + blog.likes
        : likes
    }, 0)
  )

  const max = Math.max(...totalLikes)
  return {
    author: authors[totalLikes.indexOf(max)],
    likes: max
  }
}

module.exports = {
  //dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
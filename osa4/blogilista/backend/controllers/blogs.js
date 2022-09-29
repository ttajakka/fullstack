//const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body

  //const token = getTokenFrom(request)
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //if (!request.token || !decodedToken.id) {
  //  return response.status(401).json({ error: 'token missing or invalid' })
  //}
  //const user = await User.findById(decodedToken.id)
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (body.likes === undefined) { body.likes = 0 }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog && blog.user.toString() !== user.id) {
    return response.status(401).json({ error: 'unauthorized deletion' })
  }

  if (blog && blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter
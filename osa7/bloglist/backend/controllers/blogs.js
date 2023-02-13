const router = require('express').Router()
//const jwt = require('jsonwebtoken')

//const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
//const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({ ...request.body, user: user._id })

  if(!request.body.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.user && blog.user.toString() !== user.id) {
    return response.status(401).json({ error: 'unauthorized deletion' })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})

module.exports = router
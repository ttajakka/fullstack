const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({ ...request.body, user: user._id })

  if (!request.body.likes) {
    blog.likes = 0
  }

  let savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog = await Blog.findById(savedBlog._id).populate('user')

  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
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

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString())
  await user.save()

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  updatedBlog = await Blog.findById(updatedBlog._id).populate('user')

  response.status(200).json(updatedBlog)
})

router.post('/:id/comments', async (request, response) => {
  
})

module.exports = router

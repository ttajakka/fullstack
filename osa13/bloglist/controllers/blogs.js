const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    // return res.status(400).json({ error })
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      await req.blog.destroy()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (!req.body.likes) {
    res.status(400).end()
  }

  try {
    if (req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'SequelizeValidationError') {
    res.status(400).send(error.message)
  }

  next(error)
}

router.use(errorHandler)

module.exports = router

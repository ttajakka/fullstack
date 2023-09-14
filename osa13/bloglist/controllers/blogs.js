const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const router = require('express').Router()

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')

router.get('/', async (req, res, next) => {
  try {
    let where = {}

    if (req.query.search) {
      // where.title = { [Op.substring]: req.query.search }
      where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.search}%` } },
          { author: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      }
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name', 'username'],
      },
      where,
      order: [['likes', 'DESC']],
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog) {
      if (req.blog.userId === req.decodedToken.id) {
        await req.blog.destroy()
        res.json(req.blog)
      } else {
        res.status(400).send({ error: 'unauthorized deletion' })
      }
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  // if (!req.body.likes) {
  //   res.status(400).end()
  // }

  const { likes, year } = req.body

  try {
    if (req.blog) {
      if (likes) req.blog.likes = likes
      if (year) req.blog.year = year
      await req.blog.save()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

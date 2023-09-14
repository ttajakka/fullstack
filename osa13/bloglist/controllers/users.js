const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ username, name, passwordHash })

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })
    if (user) {
      user.name = req.body.name
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: [
        {
          model: Blog,
          as: 'markedBlog',
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
          through: {
            attributes: []
          }
        }
      ]
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router

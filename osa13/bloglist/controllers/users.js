const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['id', 'userId']}
    }
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
    // console.log(error)
    // res.status(400).send({ error })
    next(error)
  }
})

module.exports = router

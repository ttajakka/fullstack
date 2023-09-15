const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  if (user.disabled) {
    return res
      .status(401)
      .json({ error: 'account disabled, please contact admin' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  try {
    await Session.create({ userId: user.id, token})
  } catch (error) {
    next(error)
  }

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router

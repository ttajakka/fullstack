const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password === undefined) {
    return response.status(400).json({
      error: 'You must provide a password.'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password must be at least 3 characters long.'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique.'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(expection) {
    next(expection)
  }
})

module.exports = usersRouter
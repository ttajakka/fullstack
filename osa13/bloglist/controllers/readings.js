const router = require('express').Router()

const { Reading } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { userId, blogId } = req.body
    const reading = await Reading.create({ blogId, userId })
    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = router

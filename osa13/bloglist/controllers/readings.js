const router = require('express').Router()
const { Op } = require('sequelize')

const { Reading, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const { userId, blogId } = req.body
    const reading = await Reading.create({ blogId, userId })
    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const { read } = req.body
    if (read === undefined) {
      return res.status(400).send({ error: 'malformed request' })
    }
    const user = await User.findByPk(req.decodedToken.id)
    const reading = await Reading.findOne({
      where: {
        [Op.and]: [
          { userId: user.id },
          { blogId: req.params.id }
        ]
      }
    })
    // console.log(user.id)
    console.log(reading)
    if (!reading) {
      return res.status(401).send({ error: 'unauthorized action'})
    }
    reading.read = read
    const savedReading = await reading.save()
    return res.status(200).json(savedReading)
  } catch (error) {
    next(error)
  }
})

module.exports = router

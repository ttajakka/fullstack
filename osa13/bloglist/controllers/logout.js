const router = require('express').Router()
const { Session } = require('../models')

router.delete('/', async (req, res, next) => {
  const authorization = req.get('authorization')
  try {
    await Session.destroy({
      where: { token: authorization.substring(7) },
    })
    res.status(200).end()
  } catch {
    next(error)
  }
})

module.exports = router

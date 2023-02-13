const app = require('./app')
//require('dotenv').config()
const http = require('http')
//const express = require('express')
//const app = express()
//const cors = require('cors')
//const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
//const blogsRouter = require('./controllers/blogs')

/*
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connectingto MongoDB:', error.message)
  })
*/

//app.use(cors())
//app.use(express.json())

//app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

//const PORT = process.env.PORT
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
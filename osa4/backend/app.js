require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true 
  })
  .then( () => logger.info("Connected to DB"))
  .catch( (error) => logger.error("DB Connection error:", error.message))

app.use( cors() )
app.use( express.json() )
app.use( middleware.requestLogger )

app.use( '/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter )
app.use( '/api/users', usersRouter )
app.use( '/api/login', loginRouter )

app.use( middleware.unknownEndPoint )
app.use( middleware.errorHandler )

module.exports = app
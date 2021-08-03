const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method: ', request.method)
  logger.info('Path:   ', request.path)
  logger.info('Body:   ', request.body)
  logger.info('---')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    
  if( error.name === 'JsonWebTokenError' ){
    return response.status(401).json({
      error: 'invalid token'
    })
  }
    
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request, response, next) => {
    
  const authorization = request.get('authorization')

  if( authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
      
  next()
}

const userExtractor = async (request, response, next) => {
    
  if(request.token){
    const userFromToken = jwt.verify( request.token, process.env.SECRET )
    const user = await User.findById(userFromToken.id)
    
    if(user){
      request.user = user
    }
  }

  next()
}
 
module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
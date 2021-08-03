const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({username: body.username})

  const passwordOk = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if( !(user && passwordOk) ){
    response.status(401).json({
      error: 'Bad password or username'
    })
  }

  const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET)

  response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
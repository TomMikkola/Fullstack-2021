const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    try{
        const users = await User
        .find({})
        .populate('blogs', {url: 1, title: 1, author: 1, id: 1})
  
      response.json( users.map(user => user.toJSON()) )
    } catch(exception){
        console.log(exception)
    }
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(body.password.length < 3){
        return response.status(400).json({
            error: 'password must contain at least 3 characters'
        })
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    try{
        const result = await user.save()
        response.status(201).json(result)
    } catch (exception){
        response.status(400).json({
            error: 'username too short or not unique'
        })
    }
    
})

module.exports = usersRouter
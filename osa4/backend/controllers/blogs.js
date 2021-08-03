const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try{
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1, id: 1})
      
    response.json( blogs.map( blog => blog.toJSON()) )
  } catch (exception) {
    console.log(exception)
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if( !(request.token && decodedToken) ){
    return response.status(401).json({
      error: 'invalid or missing token'
    })
  }
  
  const body = request.body
  const user = request.user
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user,
    likes: body.likes || 0
  })

  if( !(blog.title && blog.url) ){
    response.status(400).end()
  } else{
    try{
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json( savedBlog.toJSON() )
    } catch(exception) {
      console.log(exception)
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletingUser = request.user
  const toBeDeletedBlog = await Blog.findById( request.params.id )

  if( toBeDeletedBlog ){
    
    if( deletingUser.id === toBeDeletedBlog.user.toString() ){
  
      try{
        await Blog.findByIdAndRemove(toBeDeletedBlog._id, () => {
          response.status(204).end()
        })
      } catch(exception){
        console.log(exception)
      }

    } else {
      response.status(401).json({
        error: 'Blog can be deleted only by the user that posted the blog'
      })
    }

  } else {
    response.status(400).json({
      error: 'Blog not found with the id'
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const update = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  try{
    /* const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {new: true})
    response.json(updatedBlog.toJSON()) */
    await Blog.findByIdAndUpdate(request.params.id, update, {new: true})
    const updatedBlogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json( updatedBlogs.map( blog => blog.toJSON()) )
  } catch(exception){
    console.log(exception)
  }
})

module.exports = blogsRouter
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)


describe('Blogs...', () => {

  beforeAll( async () => {
    await User.deleteMany({})

    const user = {
      username: 'Testikäyttäjä',
      name: 'Terhi Testi',
      password: 'sekreto'
    }

    await api.post('/api/users').send(user)

    
  })

  const loginInfo = {
    username: 'Testikäyttäjä',
    password: 'sekreto'
  }

  test('are in json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('are saved to db in specific amount', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('id is identified as id', async () => {
    const response = await api.get('/api/blogs')
    expect( response.body.map( blog => blog.id) ).toBeDefined()
  })

  test('can be added', async () => {
    const login = await api.post('/api/login').send(loginInfo)
    const token = 'bearer ' + login.body.token
    const users = await api.get('/api/users')
    const user = users.body.find( user => user.username === loginInfo.username )

    let response = await api.get('/api/blogs')
    initLength = response.body.length

    const testBlog = {
      title: 'Supertest',
      author: 'Supertest',
      url: 'Supertest',
      likes: 100,
      user: user.id
    }

    response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(testBlog)
      
    response = await api.get('/api/blogs')
      
    expect( response.body.length ).toBe( initLength + 1 )
    expect( response.body.map( blog => blog.title) ).toContain('Supertest')
  })

  test('likes equal zero if not given', async () => {
    const login = await api.post('/api/login').send(loginInfo)
    const token = 'bearer ' + login.body.token
    const users = await api.get('/api/users')
    const user = users.body.find( user => user.username === loginInfo.username )

    const blog = {
      title: 'Supertest',
      author: 'Supertest',
      url: 'Supertest',
      user: user.id
    }
      
    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blog)

    expect(response.body.likes).toBe(0)
  })

  test('can`t be saved without title or url', async () => {
    const login = await api.post('/api/login').send(loginInfo)
    const token = 'bearer ' + login.body.token
    const users = await api.get('/api/users')
    const user = users.body.find( user => user.username === loginInfo.username )

    const blog = {
      author: 'Supertest',
      likes: 100,
      user: user.id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blog)
      .expect(400)
  })

  test('can be deleted', async () => {

    const login = await api.post('/api/login').send(loginInfo)
    const token = 'bearer ' + login.body.token
    const users = await api.get('/api/users')
    const user = users.body.find( user => user.username === loginInfo.username )

    let response = await api.get('/api/blogs')
    const initLength = response.body.length
      
    const testBlog = {
      title: 'Supertest',
      author: 'Supertest',
      url: 'Supertest',
      likes: 100,
      user: user.id
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(testBlog)
      
    response = await api.get('/api/blogs')
      
    const blogToBeDeleted = response.body[ response.body.length - 1 ].id
    await api
      .delete(`/api/blogs/${blogToBeDeleted}`)
      .set('Authorization', token)
      .expect(204)

    response = await api.get('/api/blogs')
      
    expect( response.body.length ).toBe( initLength )
  })

  test('can be updated', async () => {

    const result = await api.get('/api/blogs')
    const blog = result.body[2]
    const initBlogLikes = blog.likes
    blog.likes++

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      
    expect( response.body.likes ).toBe( initBlogLikes + 1 )
  })

  test('can`t be posted without token', async () => {
    const users = await api.get('/api/users')
    const user = users.body.find( user => user.username === loginInfo.username )

    const testBlog = {
      title: 'Supertest',
      author: 'Supertest',
      url: 'Supertest',
      likes: 100,
      user: user.id
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(401)
  })
})

describe('Users...', () => {

  beforeEach( async () => {
    await User.deleteMany({})

    const initialUser = new User({
      username: 'not-so-unique',
      name: 'unique',
      password: 'onlyme'
    })

    await initialUser.save()
  })

  test('username has to be at least 3 characters', async () => {
    let result = await api.get('/api/users')
    const initUsersLength = result.body.length

    const newUser = {
      username: 'Su',
      name: 'Super',
      password: 'supersalasana'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('username too short')

    result = await api.get('/api/users')
    expect( result.body.length ).toBe( initUsersLength )
  })

  test('password has to be at least 3 characters', async () => {
    let result = await api.get('/api/users')
    const initUsersLength = result.body.length

    const newUser = {
      username: 'Supertest',
      name: 'Super',
      password: 'su'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('at least 3 characters')

    result = await api.get('/api/users')
    expect( result.body.length ).toBe( initUsersLength )
  })

  test('can be added with fresh username', async () => {
    let result = await api.get('/api/users')
    const initUsersLength = result.body.length

    const newUser = {
      username: 'Supertest',
      name: 'Super',
      password: 'supersalasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    result = await api.get('/api/users')
    expect( result.body.length ).toBe( initUsersLength + 1 )
    expect( result.body.map( user => user.username) ).toContain('Supertest')
  })

  test('username has to be unique', async () => {
    let result = await api.get('/api/users')
    const initUsersLength = result.body.length

    const newUser = {
      username: 'not-so-unique',
      name: 'unique',
      password: 'onlyme'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('or not unique')

    result = await api.get('/api/users')
    expect( result.body.length ).toBe( initUsersLength )
  })

})

afterAll( () => {
  mongoose.connection.close()
})
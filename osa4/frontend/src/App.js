import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initialBlogs } from './reducers/blogsReducer'
import { initialUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Notification from './components/Notification'

import blogService from './services/blogs'

import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector( state => state.user)
  const users = useSelector( state => state.users)
  const blogs = useSelector( state => state.blogs )

  useEffect( async () => {
    dispatch( initialBlogs() )
    dispatch( initialUsers() )

    const loggedUser = window.localStorage.getItem('loggedUser')
    if( loggedUser ){
      dispatch( setUser( JSON.parse(loggedUser) ) )
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  const getUserById = (id) =>
    users.find( user => user.id === id)

  const getBlogById = (id) =>
    blogs.find( blog => blog.id === id )

  const userMatch = useRouteMatch('/users/:id')
  const userInDetail = userMatch
    ? getUserById(userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogInDetail = blogMatch
    ? getBlogById(blogMatch.params.id)
    : null

  return (
    <>
      { user === null
        ? <LoginForm />
        : <>
          <Menu/>
          <Switch>

            <Route path='/users/:id'>
              <Notification />
              {userInDetail
                ? <User user={userInDetail} />
                : null
              }
            </Route>

            <Route path='/blogs/:id'>
              <h2>blogs</h2>
              <Notification />
              {blogInDetail
                ? <Blog blog={blogInDetail} inDetail={true}/>
                : null
              }
            </Route>

            <Route path='/users'>
              <Notification />
              <UserList />
            </Route>

            <Route path='/'>
              <h2>blogs</h2>
              <Notification />
              <BlogList />
            </Route>

          </Switch>
        </>
      }
    </>
  )
}

export default App
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggleable from './components/Toggleable'
import PostBlogForm from './components/PostBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import PropTypes from 'prop-types'

const LoginForm = ({ notification, handleLogin, username, setUsername, password, setPassword }) => {
  return <>
    <h2>Log in to application</h2>
    <div>{notification}</div>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
      Password
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState('')

  const postBlogRef = useRef()

  useEffect( async () => {
    const responseBlogs = await blogService.getAll()
    setBlogs( responseBlogs )

    const loggedUser = window.localStorage.getItem('loggedUser')
    if( loggedUser ){
      setUser( JSON.parse(loggedUser) )
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try{
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser) )
      blogService.setToken(loggedUser.token)

    } catch(exception){
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try{
      const addedBlog = await blogService.create(newBlog)
      const updatedBlogs = blogs.concat(addedBlog)
      setBlogs(updatedBlogs)

      setNotification(`a new blog "${newBlog.title}" by "${newBlog.author}" added`)
      setTimeout(() => {
        setNotification('')
      }, 5000)

      postBlogRef.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
    }
  }

  const likeABlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    const returnedBlogs = await blogService.update(updatedBlog)
    setBlogs(returnedBlogs)
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog)
    const updatedBlogs = blogs.filter( initBlog => blog.id === initBlog.id ?null :initBlog)
    setBlogs(updatedBlogs)
  }

  const postBlogForm = () => (
    <Toggleable buttonLabel="create a new blog" ref={postBlogRef}>
      <PostBlogForm createBlog = {createBlog} />
    </Toggleable>
  )

  const sortBlogs = (blogs) => {
    blogs.sort( (elem1, elem2) => ( elem1.likes > elem2.likes ? -1 : 1 ) )
    return(
      <div id="blogDiv">{blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} likeABlog={likeABlog} deleteBlog={deleteBlog}/>)}</div>
    )
  }

  return (
    <>
      { user === null
        ? <LoginForm notification={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : <>
          <div>
            <h2>blogs</h2>
            <p> {user.name} is logged in <button onClick={handleLogout}>logout</button> </p>
            <div>{notification}</div>
            {postBlogForm()}
            <div> {sortBlogs( blogs )} </div>
          </div>
        </>
      }
    </>
  )
}

export default App
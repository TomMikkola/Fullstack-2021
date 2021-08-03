import React, { useState } from 'react'

const Blog = ({ blog, user, likeABlog, deleteBlog }) => {

  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    border: '1px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const handleLike = () => {
    likeABlog(blog)
  }

  const handleDelete = async () => {
    if( window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`) ){
      deleteBlog(blog)
    }
  }

  const showDelete = () => {
    if(user.name === blog.user.name){
      return(<button onClick={handleDelete}>delete</button>)
    } else{
      return null
    }
  }

  return (
    <div style={blogStyle} className="blogDivItem">
      {blog.title} <span>-</span> {blog.author} <button onClick={toggleShowAll}>{showAll ?'hide' :'view'}</button>
      <div style={ showAll ?{ display: 'block' } :{ display: 'none' } } className="additionalInfo">
        <div>{blog.url}</div>
        <div id="blogLikes">{blog.likes}<button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        {showDelete()}
      </div>
    </div>
  )
}

export default Blog
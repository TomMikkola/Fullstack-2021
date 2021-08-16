import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useHistory } from 'react-router'
import CommentBlogForm from './CommentBlogForm'

const Blog = ({ blog, inDetail=false }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector( state => state.user)

  /* const blogStyle = {
    border: '1px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  } */

  const handleLike = () => {
    dispatch( likeBlog(blog) )
  }

  const handleDelete = async () => {
    if( window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`) ){
      dispatch( deleteBlog(blog) )
      history.push('/')
    }
  }

  const showDelete = () => {
    if(user.name === blog.user.name){
      return(<button onClick={handleDelete}>delete</button>)
    } else{
      return null
    }
  }

  if(!inDetail){
    return (
      <div /* style={blogStyle}  */className="blogDivItem">
        {blog.title} <span>-</span> {blog.author}
      </div>
    )
  } else{
    return(
      <>
        <h1>{blog.title} {blog.author}</h1>
        <div><a href={`${blog.url}`} target='_blank' rel='noreferrer'>{blog.url}</a></div>
        <div id="blogLikes">{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        {showDelete()}
        <h2>comments</h2>
        <CommentBlogForm />
        {
          blog.comments.length === 0
            ? <div>No comments...yet</div>
            : <ul>{ blog.comments.map( (comment, index) =>
              <li key={index}>{comment}</li>)
            }
            </ul>
        }
      </>
    )
  }
}

export default Blog
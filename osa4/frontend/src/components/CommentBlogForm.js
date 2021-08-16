import React from 'react'
import { useInput } from '../hooks/hooks'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const CommentBlogForm = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const commentInput = useInput('comment')

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    dispatch( commentBlog(params.id, comment) )
    commentInput.reset()
  }

  // eslint-disable-next-line no-unused-vars
  const { reset, ...inputNoReset } = commentInput

  return(
    <form onSubmit={handleSubmit}>
      <input { ...inputNoReset }/>
      <button>add comment</button>
    </form>
  )
}

export default CommentBlogForm
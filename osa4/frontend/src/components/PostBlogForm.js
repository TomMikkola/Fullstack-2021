import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

import { FormControl, InputLabel, Input, Button } from '@material-ui/core'

const PostBlogForm = ({ hideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const createBlog = async (newBlog) => {
    try{
      dispatch( addNewBlog(newBlog) )
      dispatch( setNotification(`a new blog "${newBlog.title}" by "${newBlog.author}" added`, 5) )

      hideForm.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleCreateNew = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          <FormControl>
            <InputLabel>Title</InputLabel>
            <Input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={ ({ target }) => setTitle(target.value)}/>
          </FormControl>
        </div>

        <div>
          <FormControl>
            <InputLabel>Author</InputLabel>
            <Input
              id="author"
              type="text"
              name="author"
              value={author}
              onChange={ ({ target }) => setAuthor(target.value)}/>
          </FormControl>
        </div>

        <div>
          <FormControl>
            <InputLabel>URL</InputLabel>
            <Input
              id="url"
              type="text"
              name="url"
              value={url}
              onChange={ ({ target }) => setUrl(target.value)}/>
          </FormControl>
        </div>

        <Button
          variant='contained'
          color='primary'
          size='small'
          id='submitBlog'
          type="submit"
        >
          Create
        </Button>
      </form>
    </>
  )
}

PostBlogForm.propTypes = {
  hideForm: PropTypes.object.isRequired
}

export default PostBlogForm
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PostBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
        <div>title
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={ ({ target }) => setTitle(target.value)}/>
        </div>
        <div>author
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={ ({ target }) => setAuthor(target.value)}/>
        </div>
        <div>url
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={ ({ target }) => setUrl(target.value)}/>
        </div>
        <button id="submitBlog" type="submit">create</button>
      </form>
    </>
  )
}

PostBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default PostBlogForm
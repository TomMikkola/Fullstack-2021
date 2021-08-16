import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Toggleable from './Toggleable'
import PostBlogForm from './PostBlogForm'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

const BlogList = () => {
  const blogs = useSelector( state => state.blogs )
  const postBlogRef = useRef()

  const sortBlogs = (blogs) => {
    blogs.sort( (elem1, elem2) => ( elem1.likes > elem2.likes ? -1 : 1 ) )

    return(
      <List component='nav' id="blogDiv">
        {blogs.map(blog =>
          <div key={blog.id}>
            <ListItem button>
              <Link to={`/blogs/${blog.id}`} >
                <Blog blog={blog}/>
              </Link>
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    )
  }

  const postBlogForm = () => (
    <Toggleable buttonLabel="create a new blog" ref={postBlogRef}>
      <PostBlogForm hideForm={postBlogRef}/>
    </Toggleable>
  )

  return(
    <div>
      {postBlogForm()}
      <div> {sortBlogs( blogs )} </div>
    </div>
  )
}

export default BlogList
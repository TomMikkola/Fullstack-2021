import blogService from '../services/blogs'

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INITIAL_BLOGS',
      data: blogs
    })
  }
}

export const addNewBlog = (newBlog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlog)

    dispatch({
      type: 'CREATE',
      data: addedBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    const returnedBlogs = await blogService.update(updatedBlog)

    dispatch({
      type: 'LIKE',
      data: returnedBlogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)

    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const response = await blogService.commentBlog(id, comment)

    dispatch({
      type: 'UPDATE',
      data: response
    })
  }
}

const blogReducer = (state=[], action) => {

  switch(action.type){
  case 'INITIAL_BLOGS':
    return action.data

  case 'CREATE':
    return state.concat(action.data)

  case 'LIKE':
    return action.data

  case 'DELETE':
    // eslint-disable-next-line no-case-declarations
    const newState = state.filter( initBlog => action.data.id === initBlog.id ? null : initBlog)
    return newState

  case 'UPDATE':
    // eslint-disable-next-line no-case-declarations
    const updatedState = [...state].map( blog => blog.id === action.data.id ? action.data : blog)
    return updatedState

  default:
    return state
  }
}

export default blogReducer
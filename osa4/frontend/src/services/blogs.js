import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = tokenFromApp => {
  token = 'bearer ' + tokenFromApp
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url }) => {
  const newBlog = {
    title: title,
    author: author,
    url: url
  }

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const url = baseUrl + '/' + blog.id
  const response = await axios.put(url, blog)

  return response.data
}

const deleteBlog = async (blog) => {
  const url = baseUrl + '/' + blog.id
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(url, config)

}

const commentBlog = async (id, comment) => {
  const url = `${baseUrl}/${id}/comments`
  const upload = { comments: comment }
  const response = await axios.post( url, upload )
  return response.data
}

export default {
  setToken,
  getAll,
  create,
  update,
  deleteBlog,
  commentBlog
}
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    votes: 0
  }

  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data

  await axios.put(`${baseUrl}/${id}`, {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  })

  return anecdote
}

export default { getAll, create, update }
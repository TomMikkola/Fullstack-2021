/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdotes'

export const voteFor = (id) => {
  return async dispatch => {
    await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      id: id
    })
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: {
        content: newAnecdote.content,
        id: newAnecdote.id,
        votes: 0
      }
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type){
  case 'VOTE':
    const anecdoteVoted = state.find( anec => anec.id === action.id )
    const updatedVote = { ...anecdoteVoted, votes: anecdoteVoted.votes + 1 }
    return state.map( anec => anec.id === action.id ? updatedVote : anec)
  case 'CREATE':
    return state.concat(action.data)
  case 'INITIAL':
    return action.data
  default:
    return state
  }
}

export default reducer
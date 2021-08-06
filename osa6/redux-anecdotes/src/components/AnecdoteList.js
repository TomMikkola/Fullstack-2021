import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter( anec => anec.content.includes(filter) ? anec : undefined)
    return(filteredAnecdotes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch( voteFor(anecdote.id) )
    dispatch( setNotification(`You voted for "${anecdote.content}"`, 5) )
  }

  const sortAnecdotes = () => {
    const sortedAnectodes = anecdotes.sort( (elm1, elm2) => elm1.votes > elm2.votes ? -1 : 1)

    return (
      sortedAnectodes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
    )
  }

  return(
    sortAnecdotes()
  )
}

export default AnecdoteList
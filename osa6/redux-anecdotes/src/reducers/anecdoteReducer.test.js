import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

test('vote can be added', () => {
  let action = {
    type: 'UNDEFINED'
  }
  const initState = anecdoteReducer(undefined,action)
  deepFreeze(initState)

  action = {
    type: 'VOTE',
    id: initState[0].id
  }

  const newState = anecdoteReducer(initState,action)

  expect(newState[0].votes).toBe(1)
})
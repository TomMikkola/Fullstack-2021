import React, {useState} from 'react';

const Header = ({text}) => ( <h1>{text}</h1> )
const Display = ({anecdote}) => ( <div>{anecdote}</div> )
const Button = ({handleClick, text}) => ( <button onClick={handleClick}>{text}</button> )
const Stats = ({votes, selected}) => ( <div> has {votes[selected]} votes </div>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selectedAnecdote, setSelected] = useState(0)
  const [votes, setVotes] = useState( new Array(anecdotes.length).fill(0) )

  const randomClick = () => {
    let randomNumber = Math.floor( Math.random() * 7 )
    setSelected(randomNumber)
  }

  const voteClick = () => {
    let updateVotes = [...votes]
    updateVotes[selectedAnecdote] += 1
    setVotes(updateVotes)
  }

  const mostVotes = () => {
    let indexOfMostVotes = votes.indexOf(Math.max(...votes))
    return indexOfMostVotes
  }

  return (
    <>
      <Header text='Anecdote of the day' />
      <Display anecdote={anecdotes[selectedAnecdote]} />
      <Stats votes={votes} selected={selectedAnecdote} />
      <Button handleClick={randomClick} text='Next anecdote' />
      <Button handleClick={voteClick} text='Vote' />
      <Header text='Anecdote with most votes' />
      <Display anecdote={anecdotes[mostVotes()]} />
      <Stats votes={votes} selected={mostVotes()} />
    </>
  )
}

export default App;
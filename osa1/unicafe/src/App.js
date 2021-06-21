import React, {useState} from 'react';

const Header = () => ( <h1>give feedback</h1> )

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td> 
    </tr>
  )
}

const Statistics = (props) => {
  let good = props.stats.good
  let neutral = props.stats.neutral
  let bad = props.stats.bad
  let all = good + neutral + bad

  const average = () => ( Number.parseFloat((good*1 + neutral*0 + bad*(-1) ) / all ).toFixed(1) )
  const positive = () => ( Number.parseFloat( good*100 / all ).toFixed(1) + '%' )

  if( all === 0 ){
    return(
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  } else{
  
    return(
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='good' value={good} />
            <StatisticsLine text='neutral' value={neutral} />
            <StatisticsLine text='bad' value={bad} />
            <StatisticsLine text='all' value={all} />
            <StatisticsLine text='average' value={average()} />
            <StatisticsLine text='positive' value={positive()} />
          </tbody>
        </table>
      </>
    )
  }
}

function App() {
  const [stats, setStats] = useState({good: 0, neutral: 0, bad: 0})

  const handleGood = () =>{
    const updateStats = ({...stats, good: stats.good + 1})
    setStats(updateStats)
  }
  
  const handleNeutral = () => {
    const updateStats = ({...stats, neutral: stats.neutral + 1})
    setStats(updateStats)
  }
  
  const handleBad = () => {
    const updateStats = ({...stats, bad: stats.bad + 1})
    setStats(updateStats)
  }

  return (
    <>
      <Header />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics stats={stats}/>
    </>
  )
}

export default App;
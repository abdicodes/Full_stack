import React, { useState } from 'react'
const Button = (props) => {
  return (
   <button onClick={props.eventHandler}>{props.text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  // const eventHandler = (props) => 

  return (
    <div>
      <h1>Give feedback</h1>
      <Button eventHandler= {() => setGood(good + 1)} text = "Good" />
      <Button eventHandler= {() =>setNeutral(neutral + 1)} text = "Neutral" />
      <Button eventHandler= {() =>setBad(bad + 1)} text = "Bad" />
      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Average {(good-bad)/all}</p>
      <p>Positive {good / all * 100} %</p>
    </div>
  )
}

export default App

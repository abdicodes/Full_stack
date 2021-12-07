import React, { useState } from "react";
const Button = (props) => {
  return <button onClick={props.eventHandler}>{props.text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = ((good - bad) / total).toFixed(2);
  let positive = (good / total).toFixed(2);

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /* I used arrow function to change the state instead of writing 3 different functions
   I found this to be efficient in this case. */
  return (
    <div>
      <h1>Give feedback</h1>

      <Button eventHandler={() => setGood(good + 1)} text="Good" />
      <Button eventHandler={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button eventHandler={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

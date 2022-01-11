import { useState } from "react";

// component for showing statistics
const Statistics = ({ good, neutral, bad }) => {
  const all = bad + neutral + good;
  let average = (good - bad) / all;
  let positive = (100 / all) * good;
  average = parseFloat(average.toFixed(4));
  positive = parseFloat(positive.toFixed(4));

  if (all === 0) {
    return (
      <div>
        <p>No feedback gives</p>
      </div>
    );
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positve" value={positive} percent="%" />
    </table>
  );
};

// component for showing single stat
const StatisticLine = ({ value, text, percent }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>
          {!isNaN(value) && value >= 0 && value}
          {percent && percent}
        </td>
      </tr>
    </tbody>
  );
};

//component for feedback change
const Button = ({ ...props }) => {
  const { good, setGood, bad, setBad, neutral, setNeutral } = props;
  return (
    <div>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        good={good}
        neutral={neutral}
        bad={bad}
        setBad={setBad}
        setGood={setGood}
        setNeutral={setNeutral}
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

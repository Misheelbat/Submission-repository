import { useState } from "react";
function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  // generate random number
  const randomNumber = () => Math.floor(Math.random() * 7);

  // increment vote by 1
  const handleVotes = (select) => {
    let newArray = [...votes];
    newArray[select] += 1;
    setVotes([...newArray]);
  };

  const lnm = Math.max(...votes);
  const i = votes.indexOf(lnm);

  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={() => handleVotes(selected)}>vote</button>
      <button onClick={() => setSelected(randomNumber)}>next anecdote</button>
      <h1>Anectode with the most votes</h1>
      <div>{anecdotes[i]}</div>
      <div>has {lnm} votes</div>
    </div>
  );
}

export default App;

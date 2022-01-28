import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AnecdoteList() {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = id => {
    dispatch({ type: 'VOTE', id });
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

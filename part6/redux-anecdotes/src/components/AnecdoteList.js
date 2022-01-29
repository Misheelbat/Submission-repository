import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../reducers/notificationReducer';
import { incVote } from '../reducers/anecdoteReducer';

export default function AnecdoteList() {
  let anecdotes = useSelector(state => state.anectodes);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();
  console.log('filter', filterValue);
  anecdotes = anecdotes.filter(anec => {
    if (filterValue === null) {
      return anec;
    } else {
      if (anec.content.includes(filterValue)) {
        return anec;
      }
    }
  });
  const vote = anecdote => {
    dispatch(incVote(anecdote.id));
    dispatch(sendMessage(`you voted ${anecdote.content}`));
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

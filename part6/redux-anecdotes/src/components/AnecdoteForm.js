import React from 'react';
import { newAnec } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import service from '../services/anecdotes';
import { sendMessage } from '../reducers/notificationReducer';

export default function AnecdoteForm() {
  const dispatch = useDispatch();
  const add = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const newObject = await service.createNew(content);
    console.log('object', newObject);

    dispatch(newAnec(newObject));
    //dispatch(sendMessage(`added ${newObject.content}`));
    e.target.anecdote.value = '';
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

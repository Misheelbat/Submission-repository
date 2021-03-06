import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createNew = async newObject => {
  const object = { content: newObject, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};
const update = async newAnecdote => {
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote);
  return response.data;
};
export default { getAll, createNew, update };

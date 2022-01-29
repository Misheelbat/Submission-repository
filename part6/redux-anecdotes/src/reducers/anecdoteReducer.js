import service from '../services/anecdotes';
const anecReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const [vote] = state.filter(an => an.id === action.data.id);
      const newVote = { ...vote, votes: vote.votes + 1 };
      const newState = state.map(state =>
        state.id !== action.data.id ? state : newVote
      );
      return newState;
    case 'NEW':
      const newAnectode = action.data;
      return state.concat(newAnectode);
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export const incVote = newAnecdote => {
  return async dispatch => {
    const newObject = await service.update({
      ...newAnecdote,
      votes: newAnecdote.votes + 1,
    });
    dispatch({ type: 'VOTE', data: newObject });
  };
};
export const initServer = () => {
  return async dispatch => {
    const anecdote = await service.getAll();
    dispatch({
      type: 'INIT',
      data: anecdote,
    });
  };
};
export const newAnec = anec => {
  return async dispatch => {
    const newAnecdote = await service.createNew(anec);
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    });
  };
};
export default anecReducer;

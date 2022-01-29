const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const [vote] = state.filter(an => an.id === action.id);
      const newVote = { ...vote, votes: vote.votes + 1 };
      const newState = state.map(state =>
        state.id !== action.id ? state : newVote
      );
      return newState;
    case 'NEW':
      const newAnectode = action.data;
      return state.concat(newAnectode);
    default:
      return state;
  }
};

export const incVote = id => {
  return {
    type: 'VOTE',
    id,
  };
};

export const newAnec = anec => {
  return {
    type: 'NEW',
    data: { content: anec, id: getId(), votes: 0 },
  };
};
export default anecReducer;

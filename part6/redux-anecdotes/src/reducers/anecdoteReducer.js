

const getId = () => (100000 * Math.random()).toFixed(0);


const anecReducer = (state = [], action) => {
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

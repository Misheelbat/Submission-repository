const noteReducer = (state = null, action) => {
  switch (action.type) {
    case 'MSG':
      return action.notification;
    default:
      return state;
  }
};
export const sendMessage = (note, time) => {
  return async dispatch => {
    dispatch({ type: 'MSG', notification: note });
    const timer = setTimeout(() => {
      dispatch({ type: 'MSG', notification: null });
    }, time * 1000);
    return () => clearTimeout(timer);
  };
};

export default noteReducer;

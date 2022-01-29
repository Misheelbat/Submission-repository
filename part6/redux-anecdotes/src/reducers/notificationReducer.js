const noteReducer = (state = null, action) => {
  switch (action.type) {
    case 'MSG':
      return action.notification;
    default:
      return state;
  }
};
export const sendMessage = note => {
  return {
    type: 'MSG',
    notification: note,
  };
};

export default noteReducer;

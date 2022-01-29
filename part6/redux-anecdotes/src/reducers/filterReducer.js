const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.content;
    default:
      return state;
  }
};
export default filterReducer;

import { createSlice } from '@reduxjs/toolkit';
const notificationSlice = createSlice({
  name: 'notification',
  initialState: { show: false, msg: '', type: '' },
  reducers: {
    showNotification: (state, action) => {
      state.show = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
  },
});
export const showAsync = message => {
  return async (dispatch, getState) => {
    dispatch(showNotification(message));
    const timer = setTimeout(() => {
      dispatch(showNotification({ show: false }));
    }, 2000);
    return () => clearTimeout(timer);
  };
};
export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

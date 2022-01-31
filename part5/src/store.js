import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './features/NotificationSlice';
const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;

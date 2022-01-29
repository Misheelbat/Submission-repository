import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
const Notification = () => {
  let notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(sendMessage(null));
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <div style={style}>{notification}</div>
    </div>
  );
};

export default Notification;

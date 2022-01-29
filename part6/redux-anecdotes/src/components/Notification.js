import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  let notification = useSelector(state => state.notification);

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

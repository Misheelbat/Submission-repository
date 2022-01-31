import React from 'react';
import './Notification.css';
import { useSelector } from 'react-redux';

export default function Notification() {
  const { msg, type } = useSelector(state => state.notification);

  if (msg === null) {
    return null;
  }

  return <div className={type}>{msg}</div>;
}

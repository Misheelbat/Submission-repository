import React from 'react';
import { useEffect } from 'react';
import './Notification.css';

export default function Notification({ showError, type, msg }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      showError(false);
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  if (msg === null) {
    return null;
  }

  return <div className={type}>{msg}</div>;
}

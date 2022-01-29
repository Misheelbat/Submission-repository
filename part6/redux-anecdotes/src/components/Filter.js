import React from 'react';
import { useDispatch } from 'react-redux';

export default function Filter() {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };

  const handleChange = e => {
    const content = e.target.value;
    dispatch({ type: 'FILTER', content });
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}

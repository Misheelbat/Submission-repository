import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_BIRTHYEAR, GET_AUTHORS } from './queries';
import Select from 'react-select';

export default function BirthYear({ options }) {
  const [setBornTo, setYear] = useState('');
  const [selectedName, setName] = useState('');
  const [changeBirthyear, result] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSubmit = e => {
    e.preventDefault();
    const name = selectedName.value;
    changeBirthyear({ variables: { name, setBornTo } });
    setName('');
    setYear('');
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found');
    }
  }, [result.data]);

  return (
    <div>
      <h2>Set Birthyear</h2>
      <Select
        options={options}
        defaultValue={selectedName}
        onChange={setName}
      />
      <form onSubmit={handleSubmit}>
        <div>
          born
          <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">change</button>
      </form>
    </div>
  );
}

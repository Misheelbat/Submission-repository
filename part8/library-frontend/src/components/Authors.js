import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from './queries';
import BirthYear from './BirthYear';
const Authors = props => {
  const result = useQuery(GET_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = [...result.data.allAuthors];
  const options = [];
  authors.map(a => {
    const ob = { value: a.name, label: a.name };
    options.push(ob);
  });


  return (
    <div>
      <h2>authors</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BirthYear options={options} />
    </div>
  );
};

export default Authors;

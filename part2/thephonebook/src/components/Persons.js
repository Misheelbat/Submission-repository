import SinglePerson from "./SinglePerson";

export default function Persons({ persons, handleDelete }) {
  return (
    <div>
      {persons.map((person) => (
        <SinglePerson
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

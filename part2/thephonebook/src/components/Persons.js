import SinglePerson from "./SinglePerson";

export default function Persons({ persons }) {
  return (
    <div>
      {persons.map((person) => (
        <SinglePerson
          key={person.id}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  );
}

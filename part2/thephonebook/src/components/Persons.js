import SinglePerson from "./SinglePerson";

export default function Persons({ persons }) {
  return (
    <div>
      {persons.map((person) => (
        <SinglePerson
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  );
}

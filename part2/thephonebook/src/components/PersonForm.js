export default function PersonForm({ ...props }) {
  const { newName, setNewName, newNumber, setNewNumber, persons, setPersons } =
    props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((pers) => pers.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const nameAdd = { name: newName, number: newNumber };
    setPersons(persons.concat(nameAdd));
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          type="number"
          required
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

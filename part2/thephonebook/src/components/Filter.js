export default function Filter({ setSearch, search, persons, setPersons }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const newPeople = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(search)
    );
    setPersons([...newPeople]);
    console.log(newPeople);
  };

  return (
    <div>
      filter shown with:
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}

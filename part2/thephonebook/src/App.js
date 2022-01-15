import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAll, update, change, create } from "./services/notes";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const newPerson = persons.filter((per) => {
    if (search === " ") {
      return per;
    } else if (per.name.toLowerCase().includes(search.toLowerCase())) {
      return per;
    }
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      update(id);
      const a = persons.filter((p) => p.id !== id);
      setPersons(a);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((pers) => pers.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const [updatePerson] = persons.filter((p) => p.name === newName);
        console.log("update", updatePerson);
        const newPerson = { ...updatePerson, number: newNumber };
        console.log("object", newPerson);
        change(updatePerson.id, newPerson);
        setPersons(
          persons.map((a) => {
            return a.id === newPerson.id ? newPerson : a;
          })
        );
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    const nameAdd = { name: newName, number: newNumber };

    create(nameAdd).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={newPerson} handleDelete={handleDelete} />
    </div>
  );
}

export default App;

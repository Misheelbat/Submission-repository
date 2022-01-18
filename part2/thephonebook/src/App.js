import { useEffect, useState } from "react";
import ErrorMsg from "./components/ErrorMsg";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAll, update, change, create } from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const showError = (show = false, msg = "", type = "") => {
    setErrorMessage({ show, msg, type });
  };

  useEffect(() => {
    getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) => console.log(err));
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
      update(id).catch((err) => {
        console.log(err);
      });
      showError(true, `deleted ${name}`, "error");
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
        change(updatePerson.id, newPerson)
          .then((res) => {
            setPersons(
              persons.map((a) => {
                return a.id === res.id ? res : a;
              })
            );
            setNewName("");
            setNewNumber("");
            showError(true, "changed number", "error");
          })
          .catch((error) => {
            showError(
              true,
              `information of ${updatePerson.name} had already been removed from server`,
              "red"
            );
            const a = persons.filter((p) => p.id !== updatePerson.id);
            setPersons(a);
            setNewName("");
            setNewNumber("");
          });
        return;
      }
    }
    const nameAdd = { name: newName, number: newNumber };

    create(nameAdd)
      .then((res) => {
        setPersons(persons.concat(res));
        showError(true, `added ${nameAdd.name}`, "error");
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        const msg = JSON.stringify(error.response.data);
        showError(true, msg, "red");
        setNewName("");
        setNewNumber("");
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage.show && (
        <ErrorMsg {...errorMessage} deleteMsg={showError} />
      )}
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

import { useState, useRef, useEffect } from "react";

import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [backupPersons, setBackupPersons] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const newName = useRef("");
  const newNumber = useRef("");
  const filter = useRef("");

  const postPersons = async (newPerson) => {
    await fetch("http://localhost:3001/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });
  };

  const maxId = (persons) => {
    return (
      persons.reduce((acc, element) => {
        if (element.id > acc) {
          return (acc = element.id);
        }
      }, 0) + 1
    );
  };

  const addRecord = (event) => {
    event.preventDefault();
    const maxIdPerson = maxId(backupPersons);
    const newPerson = {
      name: newName.current.value,
      number: newNumber.current.value,
      id: maxIdPerson,
    };
    console.log(newPerson);
    const personExists = persons.some(
      (person) => person.name === newPerson.name
    );
    if (!personExists) {
      postPersons(newPerson);
      setPersons((prevPersons) => [...prevPersons, newPerson]);
      setBackupPersons((prevPersons) => [...prevPersons, newPerson]);
    } else {
      alert(`El nombre ${newPerson.name} ya está registrado`);
    }
  };

  const searchFilter = () => {
    if (filter.current.value.length < 1) {
      setPersons(backupPersons);
    } else {
      const search = filter.current.value.toLowerCase();
      const filteredPersons = backupPersons.filter((person) =>
        person.name.toLowerCase().includes(search)
      );
      if (filteredPersons.length !== 0) {
        setNotFound(false);
        setPersons(filteredPersons);
      } else {
        setNotFound(true);
      }
    }
  };

  useEffect(() => {
    const requestData = async () => {
      const requestJson = await fetch(
        "http://localhost:3001/persons"
      );
      const data = await requestJson.json();
      setBackupPersons(data);
      setPersons(data);
    };
    requestData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        searchFilter={searchFilter}
        notFound={notFound}
      />
      <h2>Add a new </h2>
      <PersonForm
        addRecord={addRecord}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import postPerson from "./services/postPerson";
import "./App.css";
import P from "./components/Parrafo";

function App() {
  const [persons, setPersons] = useState([]);
  const [backupPersons, setBackupPersons] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const newName = useRef("");
  const newNumber = useRef("");
  const filter = useRef("");

  const requestData = async () => {
    const requestJson = await fetch("http://localhost:3001/persons");
    const data = await requestJson.json();
    setBackupPersons(data);
    setPersons(data);
  };

  const addRecord = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName.current.value,
      number: newNumber.current.value,
    };

    const personExists = persons.some(
      (person) => person.name === newPerson.name
    );

    if (!personExists) {
      postPerson(newPerson);
      requestData();
    } else {
      if (
        window.confirm(
          "Do you want to replace the number of " +
            newPerson.name +
            "?"
        )
      ) {
        const search = newPerson.name.toLowerCase();
        const filteredPersons = backupPersons.filter((person) =>
          person.name.toLowerCase().includes(search)
        );
        updatePerson(filteredPersons[0], newPerson);
      }
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

  const deletePerson = async (id) => {
    try {
      if (window.confirm("Do you really want delete that person?")) {
        await fetch(`http://localhost:3001/persons/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        requestData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePerson = async (oldPerson, newPerson) => {
    const { id } = oldPerson;
    const { name, number } = newPerson;
    try {
      await fetch(`http://localhost:3001/persons/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, number, id }),
      });
      requestData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <P>Ori</P>
      <P importante>Otra palabra</P>
      <Filter
        filter={filter}
        searchFilter={searchFilter}
        notFound={notFound}
      />
      <h2 style={{ fontWeight: "lighter" }}>Add a new </h2>
      <PersonForm
        addRecord={addRecord}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} fn={deletePerson} />
    </div>
  );
}

export default App;

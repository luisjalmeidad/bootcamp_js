import "./styles.css";
import { useState, useEffect } from "react";

const bdPersons = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Ada Lovelace", number: "39-44-5323523" },
  { name: "Dan Abramov", number: "12-43-234345" },
  { name: "Mary Poppendieck", number: "39-23-6423122" }
];

const FilterTarget = ({ target, changeTarget }) => {
  return (
    <div>
      filter shown with: <input value={target} onChange={changeTarget} />
    </div>
  );
};

const FormPersons = ({
  addPersons,
  newName,
  changeName,
  newNumber,
  changeNumber
}) => {
  return (
    <form onSubmit={addPersons}>
      <div>
        name: <input value={newName} onChange={changeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const ResultsPersons = ({ persons }) => {
  return persons.map((element) => {
    return (
      <li key={element.name}>
        {" "}
        {element.name} - {element.number}
      </li>
    );
  });
};

export default function App() {
  const [persons, setPersons] = useState(bdPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [target, setTarget] = useState("");
  const [backupPersons, setBackupPersons] = useState(bdPersons);

  const addPersons = (event) => {
    event.preventDefault();
    if (newNumber.length === 0 || newName.length === 0) {
      return alert("Por favor introduzca todos los datos");
    }
    const cloned = persons.some((person) => person.name === newName);

    if (!cloned) {
      setPersons((prevPerson) => [
        ...prevPerson,
        { name: newName, number: newNumber }
      ]);
      setBackupPersons(persons);
    } else {
      alert(`El nombre ${newName} ya existe`);
    }
  };

  const changeName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const changeNumber = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const changeTarget = (event) => {
    const newtarget = event.target.value;
    setTarget(newtarget);
    setPersons(
      persons.filter((elemento) =>
        elemento.name.toUpperCase().includes(newtarget.toUpperCase())
      )
    );
  };

  useEffect(() => {
    console.log(target.length);
    console.log(backupPersons.length);

    if (target.length === 0 && backupPersons.length > 0) {
      setPersons(backupPersons);
    }
  }, [target]);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterTarget target={target} changeTarget={changeTarget} />
      <FormPersons
        addPersons={addPersons}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
      />
      <h2>Numbers</h2>
      <ol>
        <ResultsPersons persons={persons} />
      </ol>
      ...
    </div>
  );
}

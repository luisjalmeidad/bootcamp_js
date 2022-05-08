import React from 'react';

const Persons = ({ persons, fn }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} | {person.number} <button onClick={() => {fn(person.id)}}> Delete </button>
        </p>
      ))}
    </>
  );
};

export default Persons;

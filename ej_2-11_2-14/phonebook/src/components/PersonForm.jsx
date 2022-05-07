import React from 'react';

const PersonForm = ({ addRecord, newName, newNumber }) => {
  return (
    <form onSubmit={addRecord}>
      <div>
        Name: <input ref={newName} />
      </div>
      <div>
        Number: <input ref={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

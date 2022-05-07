import React from 'react';

const Filter = ({ filter, searchFilter, message }) => {
  return (
    <div>
      Filter shown with: <input ref={filter} onChange={searchFilter} />
       {<p style={{ color: 'red' }}>{message}</p>} 
    </div>
  );
};

export default Filter;
import React from 'react';

const Filter = ({ filter, searchFilter, notFound }) => {
  return (
    <div>
      Filter shown with: <input ref={filter} onChange={searchFilter} />
      {notFound && <p style={{ color: 'red' }}>Cannot be found</p>}
    </div>
  );
};

export default Filter;

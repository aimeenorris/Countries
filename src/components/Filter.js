import React from "react";

const Filter = (props) => {
  return (
    <div>
      find countries:
      <input value={props.filterCriteria} onChange={props.handleFilterChange} />
    </div>
  );
};

export default Filter;

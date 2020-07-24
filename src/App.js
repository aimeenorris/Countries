import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
      console.log(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterCriteria(event.target.value);
  };

  const filteredCountries =
    filterCriteria === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filterCriteria.toLowerCase())
        );

  return (
    <div>
      <h1>Country Search</h1>
      <Filter
        filterCriteria={filterCriteria}
        handleFilterChange={handleFilterChange}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;

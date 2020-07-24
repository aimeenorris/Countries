import React from "react";

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <div>{<CountryDetail country={countries[0]} />}</div>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name} country={country} />
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <p>{country.name}</p>
      <button onSubmit={() => <CountryDetail country={country} />}>
        Details
      </button>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages: </h3>{" "}
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="100" height="100" />
    </div>
  );
};
export default Countries;

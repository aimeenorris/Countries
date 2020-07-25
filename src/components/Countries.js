import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries, showCountry, handleShowCountryChange }) => {
  if (showCountry !== "") {
    return <div>{<CountryDetail country={showCountry} />}</div>;
  } else if (countries.length === 1) {
    return <div>{<CountryDetail country={countries[0]} />}</div>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {countries.map((country) => (
        <Country
          key={country.name}
          country={country}
          handleShowCountryChange={handleShowCountryChange}
        />
      ))}
    </div>
  );
};

const Country = ({ country, handleShowCountryChange }) => {
  return (
    <div>
      <p>
        {country.name}
        {"  "}
        <button onClick={() => handleShowCountryChange(country)}>Show</button>
      </p>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);

  const hook = () => {
    console.log("effect - countrydetail");
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: "85e98202ad98be3d31b41007f5d6c76b",
          query: country.capital,
        },
      })
      // .get(
      //   "http://api.weatherstack.com/current?access_key=85e98202ad98be3d31b41007f5d6c76b&query=%22Raleigh%22"
      // )

      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
        setLoading(false);
        console.log(response.data);
      });
  };

  useEffect(hook, []);

  console.log("render", "weather");
  if (loading) {
    return <h2> still loading</h2>;
  }
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages: </h3>{" "}
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" height="100" />
      <h3>Current Weather in {country.capital}</h3>
      <p>Temperature: {weather.current.temperature}</p>
      <img
        src={weather.current.weather_icons[0]}
        height="50"
        width="50"
        alt="weather icon"
      />
      <p>
        Wind: {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};
export default Countries;

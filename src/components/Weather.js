import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);

  const hook = () => {
    console.log("effect - countrydetail");
    const a_key = process.env.REACT_APP_API_KEY.trim();
    // const key = "85e98202ad98be3d31b41007f5d6c76b";

    const query_str = country.capital + "," + country.name;
    console.log(`query_str: ${query_str}`);
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          //access_key: "85e98202ad98be3d31b41007f5d6c76b",
          access_key: a_key,
          query: query_str,
        },
      })
      .then((response) => {
        console.log(`weather promise fulfilled. Response ${response.status}`);
        setWeather(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("something went wrong");
        console.log(error);
        setWeather(null);
      });
  };

  useEffect(hook, []);

  console.log("render", "weather");
  if (loading) {
    console.log("Still loading", weather);
    return <h2> still loading</h2>;
  } else if (weather.success === false) {
    console.log("weather object is null", weather);
    return <div>Weather information is not available</div>;
  } else {
    console.log("We have our weather", weather);
    return (
      <div>
        <h3>Current Weather in {country.capital}</h3>
        <p>Temperature: {weather.current.temperature} Celsius</p>
        <img
          src={weather.current.weather_icons[0]}
          height="50"
          width="50"
          alt="weather icon"
        />
        <p>
          Wind: {weather.current.wind_speed} km/h direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  }
};

export default Weather;

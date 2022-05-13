import "./App.css";
import { useEffect, useRef, useState } from "react";
import Filter from "./components/Filter";

const PrintLanguages = ({ objLanguagues, index }) => {
  const obj = Object.keys(objLanguagues);
  return obj.map((element) => (
    <li key={index}> {objLanguagues[element]} </li>
  ));
};

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState({});
  const countryObj = country[0];
  useEffect(() => {
    const requestWeather = async () => {
      const request = await fetch(
        `http://api.weatherstack.com/current?access_key=dc3fca70b414d7a887ffdd0add1052e2&query=${countryObj.capital}`
      );
      const data = await request.json();
      if (!data.error) setWeather(data);
    };
    requestWeather();
  }, [country]);

  return country.map((elemento) => (
    <div key={elemento.population + elemento.ccn3 + elemento.cca3}>
      <h2> {elemento.name.common} </h2>

      <p> Capital: {elemento.capital}</p>
      <p> Population : {elemento.population}</p>

      <h4> Lenguages </h4>
      <ol>
        <PrintLanguages
          objLanguagues={elemento.languages}
          index={elemento.population + elemento.ccn3 + elemento.cca3}
        />
      </ol>

      <img
        src={elemento.flags.png}
        style={{ padding: "20px" }}
        alt={elemento.name.common}
      />

      <h4> Weather in {countryObj.capital} </h4>

      {Object.keys(weather).length > 0 && (
        <>
          {" "}
          <p> Temperatura: {weather.current.temperature} Celcius </p>
          <img src={weather.current.weather_icons[0]} alt='' />
          <p>
            {" "}
            Wind: {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}{" "}
          </p>{" "}
        </>
      )}
    </div>
  ));
};

function App() {
  const [country, setCountry] = useState([]);
  const [message, setMessage] = useState("");
  const [bkpCountry, setBkpCountry] = useState([]);

  const filter = useRef("");

  const searchFilter = () => {
    const search = filter.current.value.toLowerCase();
    if (search.length !== 0) {
      const filteredCountry = bkpCountry.filter((country) =>
        country.name.common.toLowerCase().includes(search)
      );

      if (filteredCountry.length > 10) {
        setMessage("Too many matches, specify another filter");
        setCountry([]);
      } else {
        setMessage("");
        setCountry(filteredCountry);
      }
      if (filteredCountry.length === 0) {
        setMessage("Not found");
      }
    } else {
      setCountry([]);
      setMessage("");
    }
  };

  const setSelectedCountry = (country) => {
    setCountry([country]);
  };

  useEffect(() => {
    const requestCountries = async () => {
      const request = await fetch(
        "https://restcountries.com/v3.1/all"
      );
      const data = await request.json();
      setBkpCountry(data);
    };
    requestCountries();
  }, []);

  return (
    <div>
      <p> Find countries </p>
      <Filter
        filter={filter}
        searchFilter={searchFilter}
        message={message}
      />
      <ul>
        {country.length < 11 &&
          country.length > 1 &&
          country.map((elemento) => {
            return (
              <li
                key={
                  elemento.population + elemento.ccn3 + elemento.cca3
                }>
                {" "}
                {elemento.name.common}
                <button
                  style={{ margin: "5px" }}
                  onClick={() => setSelectedCountry(elemento)}>
                  {" "}
                  Show{" "}
                </button>
              </li>
            );
          })}
      </ul>
      {country.length === 1 && <ShowCountry country={country} />}
    </div>
  );
}
export default App;

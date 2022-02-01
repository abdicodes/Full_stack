import React, { useState, useEffect } from "react";
import axios from "axios";

const search = (array, char) => {
  if (char) {
    const a = [];
    array.forEach((element) => {
      if (element.name.toLowerCase().includes(char.toLowerCase())) {
        a.push(element);
      }
    });
    return a;
  }
  return [];
};
const Details = ({ country }) => {
  return (
    <div>
      <h1> {country.name}</h1>
      <h4> Capital: {country.capital}</h4>
      <h4>Population: {country.population}</h4>
      <h2>Languages</h2>
      <ul>
        {country.languages.forEach((e, i) => {
          <li id={i}> {e.name}</li>;
        })}
      </ul>
      <div>
        {" "}
        <img src={country.flags.png} alt="flag" />
      </div>
    </div>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  useEffect(() => {
    setSearchList(search(countries, countrySearch));
  }, [countrySearch, countries]);
  const eventHandler = (e) => {
    setCountrySearch(e.target.value);
  };

  const CountryList = ({ countries }) => {
    return (
      <div>
        {countries.length < 10 ? (
          countries.map((e, i) => <div key={i}>{e.name}</div>)
        ) : (
          <p>Too many matches, Specify another filter</p>
        )}
      </div>
    );
  };
  return (
    <div>
      <form>
        <div>
          find countries <input onChange={eventHandler} />
        </div>
      </form>
      {/* <div>
        {countries.map((e, i) => (
          <div key={i}>{e.name}</div>
        ))}
      </div> */}
      {/* <CountryList countries={searchList} /> */}

      <div>
        {searchList.length === 1 ? (
          <Details country={searchList[0]} />
        ) : (
          <CountryList countries={searchList} />
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

/*this function will an array of countries as argument and compare each element of the array to a given string.
if the string is in the country name it will push the element eventally return an array of all the partial or full matches 
in case the string is empty it will return an empty array */
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
  // returns an empty array if the above condition is not met
  return [];
};

/* this component returns a single country  */
const Details = (props) => {
  const country = props.country;
  const weatherInfo = props.weatherInfo;
  const status = props.status;

  return (
    <div>
      <h1> {country.name}</h1>
      <h4> Capital: {country.capital}</h4>
      <h4>Population: {country.population}</h4>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((element, i) => (
          <li key={i}> {element.name}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag" />
      </div>
      <h2>
        Weather in {country.capital} is {status && weatherInfo.current.temp_c}
      </h2>
      <div></div>
    </div>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [weather, setWeather] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [status, setStatus] = useState(false);
  const api_key = process.env.REACT_APP_API_KEY;

  //API call to fetch countries data and save the data in the useState countries.
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  //API call to fetch weather data from www.weatherapi.com

  useEffect(() => {
    setSearchList(search(countries, countrySearch));
  }, [countrySearch, countries]);
  const eventHandler = (e) => {
    setCountrySearch(e.target.value);
  };
  useEffect(() => {
    setCountryDetails(null);
    setStatus(false);
  }, [countrySearch]);

  useEffect(() => {
    if (searchList.length === 1) {
      console.log("not ready");
      console.log(searchList);

      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${searchList[0].capital}&aqi=no`
        )
        .then((response) => {
          setWeather(response.data);
          setCountryDetails(setSearchList[0]);
          setStatus(true);
          console.log("Weather promise fulfilled");
        });
    }
  }, [searchList, api_key]);

  const CountryList = ({ countries }) => {
    return countryDetails === null ? (
      <div>
        {countries.length <= 10 ? (
          countries.map((e, i) => (
            <div key={i}>
              {e.name}{" "}
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  setCountryDetails(e);
                }}
              >
                show
              </button>
            </div>
          ))
        ) : (
          <p>Too many matches, Specify another filter</p>
        )}
      </div>
    ) : (
      <div>
        <Details
          country={countryDetails}
          weatherInfo={weather}
          status={status}
        />
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

      <div>
        {searchList.length === 1 ? (
          <Details
            country={searchList[0]}
            weatherInfo={weather}
            status={status}
          />
        ) : (
          <CountryList countries={searchList} />
        )}
      </div>
    </div>
  );
};

export default App;

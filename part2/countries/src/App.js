import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleS = (e) => {
    setName(e.target.value);
  };

  const sCountries = countries.filter((country) => {
    if (name === "") {
      return false;
    } else if (country.name.common.toLowerCase().includes(name.toLowerCase())) {
      return country;
    }
  });

  const handleClick = (id) => {
    setShow(id);
    if (id === show) {
      setShow("");
    }
  };

  console.log(sCountries);
  return (
    <div className="App">
      <span>find countries </span>
      <input type="text" value={name} onChange={handleS} />
      {sCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {sCountries.length >= 2 && sCountries.length <= 10 && (
        <div>
          {sCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button
                type="button"
                onClick={() => handleClick(country.name.common)}
              >
                show
              </button>
              {show === country.name.common && (
                <div>
                  <div>capital: {country.capital}</div>
                  <div>population: {country.population}</div>
                  <h2>languages</h2>
                  <ul>
                    {[...Object.values(country.languages)].map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <img src={country.flags.png} alt="flag" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {sCountries.length === 1 && (
        <div>
          <h1>{sCountries[0].name.common}</h1>
          <div>capital: {sCountries[0].capital}</div>
          <div>population: {sCountries[0].population}</div>
          <h2>languages</h2>
          <ul>
            {[...Object.values(sCountries[0].languages)].map((a) => (
              <li>{a}</li>
            ))}
          </ul>
          <img src={sCountries[0].flags.png} alt="flag" />
        </div>
      )}
    </div>
  );
}

export default App;

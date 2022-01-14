import { useState } from "react";
import SingleCountry from "./SingleCountry";

export default function Countries({ sCountries }) {
  const [show, setShow] = useState("");

  const handleClick = (id) => {
    setShow(id);
    if (id === show) {
      setShow("");
    }
  };
  return (
    <div>
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
      {sCountries.length === 1 && <SingleCountry sCountries={sCountries} />}
    </div>
  );
}

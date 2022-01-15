import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleCountry({ sCountries }) {
  const [weather, setWeather] = useState(null);
  const country = sCountries[0];
  const apiKey = process.env.REACT_APP_API_KEY;
  const city = country.capital;
  const base = `?q=${city}&units=metric&appid=${apiKey}`;
  const query = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    axios.get(query + base).then((response) => {
      console.log("this is response", response);
      const apiRes = response.data;
      console.log("data", apiRes);
      setWeather(apiRes);
    });
  }, []);
  console.log("weather", weather);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h2>languages</h2>
      <ul>
        {[...Object.values(country.languages)].map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <div>
        <h2>Weather in {country.capital}</h2>
        {weather !== null && (
          <div>
            <p>temperature: {weather.main.temp}° Celcius</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p>
              wind: {weather.wind.speed} m/s direction {weather.wind.deg}{" "}
              degrees
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

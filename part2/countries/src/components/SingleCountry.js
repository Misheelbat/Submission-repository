import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleCountry({ sCountries }) {
  const [weather, setWeather] = useState(null);
  const country = sCountries[0];
  const apiKey = process.env.REACT_APP_API_KEY;

  const getLocationId = async (n) => {
    const name = await country.capital;
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apiKey}&q=${name}`;

    const response = await axios.get(base + query);
    const data = await response.data;
    return data[0].Key;
  };
  const getWeather = async (i) => {
    const cBase = "http://dataservice.accuweather.com/currentconditions/v1/";
    const cQuery = `${i}?apikey=${apiKey}&details=true`;

    const response = await axios.get(cBase + cQuery);
    const data = await response.data;
    return data;
  };

  const we = async () => {
    const id = await getLocationId();
    const weather = await getWeather(id);
    setWeather(weather[0]);
  };
  useEffect(() => {
    we();
    console.log("inside", weather);
  }, []);

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
        <div>
          {weather !== null && (
            <div>
              <p>temperature: {weather.Temperature.Metric.Value}° Celcius</p>
              <p>
                wind: {weather.Wind.Speed.Metric.Value} km/h direction{" "}
                {weather.Wind.Direction.Localized}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

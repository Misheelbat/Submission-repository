import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);



  const sCountries = countries.filter((country) => {
    if (name === "") {
      return false;
    } else if (country.name.common.toLowerCase().includes(name.toLowerCase())) {
      return country;
    }
    return false;
  });

  return (
    <div className="App">
      <Search name={name} setName={setName} />
      <Countries sCountries={sCountries} />
    </div>
  );
}

export default App;

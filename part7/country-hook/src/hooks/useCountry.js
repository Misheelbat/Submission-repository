import { useEffect, useState } from 'react';
import axios from 'axios';

const useCountry = name => {
  const [data, setData] = useState(null);
  const baseUrl = `https://restcountries.com/v2/name/${name}?fullText=true`;
  const fetchData = async url => {
    const response = await axios.get(url);
    const data = response.data;
    setData(data);
  };
  useEffect(() => {
    fetchData(baseUrl);
  }, []);
  return { data };
};
export default useCountry;

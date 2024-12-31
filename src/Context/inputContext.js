/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [searchhistory, setSearchHistory] = useState([]);

  const [error, setError] = useState("");
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");

  // input change
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // dark mode button
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

    // enter to search value
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        getdata(search); // Trigger the submit function
       
      }
    };

  // weather api fetch and search history
  const searchWeather = () => {
    if (search !== "") {
      const API_KEY = "59ec7260e5bc43118fce3d1056b7f3e1";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;

      axios
        .get(url)
        .then((response) => {
          if (searchhistory.indexOf(search) === -1) {
            //search history ,same data not show === -1
            setSearchHistory([
              ...searchhistory, // old data to new data , repete data not store
              search,
            ]);
          }

          console.log(response.data, "responsedata");
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error(error, "error");
          setError("City not found ");
          setWeatherData(null);
        });
    }
  };
  

  // News api data fetch
  // const API_KEY = "3111f5f1aebb4d6e918e28ada71eb559";
  const API_KEY = "a5a28f6d927742b1b826385c28ae8215";
  const getdata = async (query) => {
    console.log(query, "query search input name");
    if (!query) {
      setNewsData(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        // ` https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${query}`
      );

      const jsonData = await response.json();
      const filterData = jsonData.articles.filter(
        (data) => data.author !== null
      );
      console.log(filterData, "filterdata");

      setNewsData(filterData || []);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <InputContext.Provider
      value={{
        search,
       
        setSearch,
        handleInput,
        theme,
        toggleTheme,
        searchWeather,
        weatherData,
        searchhistory,
        getdata,
        handleKeyPress,
        newsData,
        isLoading,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

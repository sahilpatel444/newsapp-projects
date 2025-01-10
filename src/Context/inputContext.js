/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("");

  const [newsData, setNewsData] = useState();
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

  // weather api fetch and search history

  // News api data fetch
  const API_KEY = "50dd0402d8f184cd9b29c6c6914a9dd1";
  // const API_KEY = "a5a28f6d927742b1b826385c28ae8215";
  // const API_KEY = "62a90a716b8e41c1a6852f4d2756f3ca";
  const getdata = async (query) => {
    console.log(query, "query search input name");
    if (!query) {
      setNewsData(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        // `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        `https://gnews.io/api/v4/search?q=${search}&apikey=50dd0402d8f184cd9b29c6c6914a9dd1`
      );
     
      const jsonData = await response.json();
       console.log(jsonData, "news data")
      // const filterData = jsonData?.articles?.filter(
      //   (data) => data.author !== null
      // );
      // console.log(filterData, "filterdata");

      setNewsData(jsonData || []);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // enter to search value
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getdata(search); // Trigger the submit function
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

        getdata,
        handleKeyPress,
        newsData,
        isLoading,
        user,
        setUser,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

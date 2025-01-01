/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Result from "./Result";
import "./Search.css";

import { InputContext } from "../../Context/inputContext";

function Search() {
  const { search, handleInput } = useContext(InputContext);
  const { searchWeather, searchHistory, theme } = useContext(InputContext);

  const [location, setLocation] = useState("");

  // const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchWeather(search);
    }, 300); // 300ms delay
    return () => clearTimeout(timer); // Clear timer on input change
  }, []); // Trigger on search input change

  // user location

  const handleGetLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude, "latitude");
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setLocation(data.address)); //data convert latitude to json and data send to setlocation
    });
  }, []);
  console.log(location, "getUserLocation");
  console.log("Geolocation supported:", "geolocation" in navigator);

  // enter to search value
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchWeather(search); // Trigger the submit function
    }
  };

  return (
    <>
    <div className={`weatherfull ${theme}`}>

   
      <div className={`weather ${theme}`}>
        <div className="search ">
          {/* <input type='search' value={search} onChange={()=>changeSearch(searchInput.current.value)} ref={searchInput}/> */}
          <input
            type="search"
            // value={search}
            onChange={handleInput}
            value={search}
            className={`search-input ${theme}`}
            // value={location.state_district}
            // value={`${search} ${location.state_district}`}

            placeholder="Enter City Name"
            onKeyDown={handleKeyPress}
          />

          <div className="search-btn">
            <button onClick={searchWeather}>Search</button>

            <button onClick={handleGetLocation}>get Location</button>
          </div>
        </div>

          </div>
        <div className="result">
          <Result
            historyData={searchHistory}
            location={location}
            setLocation={setLocation}
          />
      </div>
      </div>
    </>
  );
}

export default Search;

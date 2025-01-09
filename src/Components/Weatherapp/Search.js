/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Result from "./Result";
import "./Search.css";

import { InputContext } from "../../Context/inputContext";
import axios from "axios";
import DayForcast from "./DayForcast";




//////

function Search() {
  const { search, handleInput } = useContext(InputContext);
  const {  theme } = useContext(InputContext);

  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [searchhistory, setSearchHistory] = useState([]);
  const [error, setError] = useState("");


  // const [error, setError] = useState(null);
  
  const searchWeather = () => {
    if (search !== "") {
      const API_KEY = "59ec7260e5bc43118fce3d1056b7f3e1";
    
    
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`;

     
       // Fetch both APIs in parallel
       Promise.all([axios.get(weatherUrl), axios.get(forecastUrl)])
       .then(([weatherResponse, forecastResponse]) => {
           const currentWeather = weatherResponse.data;
           const forecastData = forecastResponse.data.list;

           // Process forecast data: Group by date
           const dailyForecast = forecastData.reduce((acc, curr) => {
               const date = curr.dt_txt.split(" ")[0];
               if (!acc[date]) acc[date] = [];
               acc[date].push(curr);
               return acc;
           }, {});

           const sevenDayForecast = Object.keys(dailyForecast)
               .slice(0, 6) // Extract the first 7 days
               .map((date) => ({
                   date,
                   forecast: dailyForecast[date], // All hourly data for the day
               }));

           // Update state
           setWeatherData({
               current: currentWeather,
               forecast: sevenDayForecast,
           });

           // Update search history
           if (!searchhistory.includes(search)) {
               setSearchHistory([...searchhistory, search]);
           }

           console.log({
               current: currentWeather,
               forecast: sevenDayForecast,
           },"weather and forcast data");
       })
       .catch((error) => {
           console.error("Error fetching data:", error);
           setError("City not found. Please try again.");
           setWeatherData(null);
       });
     
    }
  };



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

  useEffect(()=>{
    document.title= "Project - Weather App"
  },[])
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
          {/* <Result
            searchhistory={searchhistory}
            location={location}
            setLocation={setLocation}
            weatherData={weatherData}
          /> */}
          
      </div>
      <DayForcast
      searchhistory={searchhistory}
      location={location}
      setLocation={setLocation}
      weatherData={weatherData}
          
      />
      </div>
    </>
  );
}

export default Search;


import React, { useContext } from "react";
import "./Search.css";
import { InputContext } from "../../Context/inputContext";

const Result = ({location}) => {
  const { weatherData, searchhistory ,theme} = useContext(InputContext);

  const historyItems = searchhistory.map((item, index) => {
    return <li  key={index}>{item}</li>;
  });
 
  console.log(historyItems, "item history");
 

  return (
    <div className={theme}>
     
      <div className="result" >
     
          <div className="location">
            <span>Location:</span>
          <ul >{location.state_district}</ul>  
          
          </div>
        <div className="history">
          <span>History</span>
          <ul >{historyItems}</ul>
         
          
          <div className="datashow">
            {weatherData && weatherData?.length !== 0 ? ( //city name enter to show
              <>
                <h2>City Name: {weatherData?.name}</h2>
                <div className="tempratur">
                  <div>Max Temp:{weatherData?.main.temp_max} deg </div>
                  <div>Min Temp:{weatherData?.main.temp_min} deg</div>
                </div>
                <div className="icone">
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                  </div>
                  <div>{weatherData.weather[0].main}</div>
                </div>
              </>
            ) : (
              <>
                <h2 cl> Please Enter City Name</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

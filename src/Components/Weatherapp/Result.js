import React, { useContext } from "react";
import "./Search.css";
import { InputContext } from "../../Context/inputContext";
import { FaLocationDot } from "react-icons/fa6";

const Result = ({location,weatherData,searchhistory}) => {
  const {  theme} = useContext(InputContext);

  const historyItems = searchhistory.map((item, index) => {
    return <li  key={index}>{item}</li>;
  });
 
  console.log(historyItems, "item history");
 

  return (
    <div className={theme}>
     
        <div className="result-container">
          {/* <p>{weatherData?.forecast[0].date}</p> */}
      <div className="result" >
     
          <div className="location">
            <span>Location:</span>
          <ul >{location.state_district}</ul>  
          
          </div>
            
        <div className="history">
          {/* <span>History</span> */}
          {/* <ul >{historyItems}</ul> */}
         
          
          {/* <div className="datashow">
            {weatherData && weatherData?.length !== 0 ? ( //city name enter to show
              <>
                <h2>CURRENT WEATHER</h2>
                <h6>City Name: {weatherData?.current.name}</h6>
            
                <div className="tempratur">
                  <div>Max Temp:{weatherData?.current.main.temp_max} deg </div>
                  <div>Min Temp:{weatherData?.current.main.temp_min} deg</div>
                </div>
                <div className="icone">
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                  </div>
                  <div>{weatherData.current.weather[0].main}</div>
                </div>
              </>
            ) : (
              <>
                <h2 cl> Please Enter City Name</h2>
              </>
            )}
          </div> */}
          
          {/* new data show */}
          <div className="currentweather" >
          {weatherData && weatherData?.length !== 0 ? ( //city name enter to show
              <>
               
                <div className="datashow">
                <h6><FaLocationDot /> {weatherData?.current.name},{weatherData.current.sys.country}</h6>
                  <div style={{fontSize:"30px"}}>{weatherData?.current.main.temp} °C  </div>

                 
                  </div>
                  
                    <img className="weather-icon"
                      // src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                      src={`https://openweathermap.org/img/wn/${weatherData?.forecast[0]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                      alt="weather icon"
                    />
              
                <div className="icone">
                 
                  
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
      </div>
  );
};

export default Result;

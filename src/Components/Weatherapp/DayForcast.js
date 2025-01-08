import React from "react";
import "./Search.css";

import { CiTempHigh } from "react-icons/ci";
import { LuWind } from "react-icons/lu";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";

const DayForcast = ({ weatherData }) => {
  return (
    <div>
      {/* first logo */}
      <div
        className="bodyweather"
        style={{ display: "grid", flexDirection: "column" }}
      >
        <div style={{ display: "flex" }}>
          <div className="currentweather">
            {weatherData && weatherData?.length !== 0 ? ( //city name enter to show
              <>
                <div className="datashow">
                  <h6 style={{ fontSize: "30px" }}>
                    {" "}
                    {weatherData?.current.name},
                    {weatherData.current.sys.country}
                  </h6>
                  <p style={{ fontSize: "x-small" }}>
                    Chance of rain:{" "}
                    {weatherData.forecast[0].forecast[0].pop * 100}%
                  </p>
                  <div style={{ fontSize: "50px", paddingTop: "50px" }}>
                    {Math.round(weatherData?.current.main.temp)} °C{" "}
                  </div>
                </div>
                <div className="weather-icon">
                  <img
                    // src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                    src={`https://openweathermap.org/img/wn/${weatherData?.forecast[0]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                    alt="weather icon"
                    height={200}
                    width={200}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 cl> Please Enter City Name</h2>
              </>
            )}
          </div>
          {/* weekly forecast */}

          <div className="weekly-forecast">
            {weatherData && weatherData?.length !== 0 ? ( //city name enter to show
              <>
                <div className="forecast-card-container">
                  <div className="weekly-card">
                    <p style={{ textAlign: "left" }}>5-DAY FORECAST</p>
                    <div className="forcast-card">
                      <h2 className="card-date ">
                        {weatherData?.forecast[0]?.date}
                      </h2>

                      <img
                        className="card-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData?.forecast[0]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                        alt="icon"
                      />
                      <h2 className="weekly-temp">
                        {Math.round(
                          weatherData.forecast[0].forecast[2].main.temp_max
                        )}
                        °/{Math.round(weatherData.forecast[0].forecast[4].main.temp_min)}°
                      </h2>
                    </div>

                    <div className="forcast-card">
                      <h2 className="card-date">
                        {weatherData?.forecast[1]?.date}
                      </h2>

                      <img
                        className="card-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData?.forecast[1]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                        alt="icon"
                      />
                      <h2 className="weekly-temp">
                        {Math.round(
                          weatherData.forecast[1].forecast[4].main.temp_max
                        )}
                        °/{Math.round(weatherData.forecast[1].forecast[0].main.temp_min)}°
                      </h2>
                    </div>
                    <div className="forcast-card">
                      <h2 className="card-date">
                        {weatherData?.forecast[2]?.date}
                      </h2>

                      <img
                        className="card-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData?.forecast[2]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                        alt="icon"
                      />
                      <h2 className="weekly-temp">
                        {Math.round(
                          weatherData.forecast[2].forecast[4].main.temp_max
                        )}
                        °/{Math.round(weatherData.forecast[2].forecast[7].main.temp_min)}°
                      </h2>
                    </div>
                    <div className="forcast-card">
                      <h2 className="card-date">
                        {weatherData?.forecast[3]?.date}
                      </h2>

                      <img
                        className="card-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData?.forecast[3]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                        alt="icon"
                      />
                      <h2 className="weekly-temp">
                        {Math.round(
                          weatherData.forecast[3].forecast[4].main.temp_max
                        )}
                        °/ {Math.round(weatherData.forecast[3].forecast[7].main.temp_min)}°
                      </h2>
                    </div>
                    <div className="forcast-card">
                      <h2 className="card-date">
                        {weatherData?.forecast[4]?.date}
                      </h2>

                      <img
                        className="card-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData?.forecast[4]?.forecast[0]?.weather[0]?.icon}@2x.png`}
                        alt="icon"
                      />
                      <h2 className="weekly-temp">
                        {Math.round(
                          weatherData.forecast[4].forecast[4].main.temp_max
                        )}
                        °/ {Math.round( weatherData.forecast[4].forecast[7].main.temp_min)}°
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-data"></div>
            )}
          </div>

          <div></div>
        </div>
        {/* today forecast */}
        <div className="today-forecast-container">
          {weatherData?.forecast && (
            <div className="today-forecast ">
              {/* <p>
                {weatherData.forecast[0].forecast.length}:-awailabl forecast
                </p> */}

              <div className="today-forecast-cards">
                <p style={{ textAlign: "left" }}>Today's Forecast</p>
                <div className="today-forecast-details">
                  {weatherData.forecast[0].forecast.map((hour, index) => (
                    <div className="hour-card" key={index}>
                      <p className="time">
                        {new Date(hour.dt_txt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <img
                        style={{ alignContent: "center" }}
                        className="hour-icon"
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        alt={hour.weather[0].description}
                      />

                      <p className="hour-temp" style={{ fontSize: "20px" }}>
                        {Math.round(hour.main.temp)}°
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <div>
                  <div className="air-condition ">
                    <div className="air-main-card">
                      <p
                        className="aircondition-text"
                        style={{
                          display: "flex",
                          margin: "10px ",

                          justifyContent: "space-between",
                        }}
                      >
                        Air Condition
                        <span
                          style={{
                            marginTop: "10px",
                            backgroundColor: "blue",
                            borderRadius: "10px",
                            width: "80px",
                          }}
                        >
                          <button>see more</button>
                        </span>
                      </p>
                      <div className="air-condition-card    ">
                        <div className="real-feel">
                          <p style={{ display: "flex" }}>
                            <CiTempHigh size={15} />
                            Real-Feel
                          </p>
                          <br />
                          <h2 style={{ marginTop: "-20px" }}>
                            {Math.round(weatherData?.current.main.feels_like)}°C
                          </h2>
                        </div>
                        <div className="wind">
                          <p style={{ display: "flex", marginLeft: "-5px" }}>
                            <LuWind size={15} /> Wind
                          </p>
                          <br />
                          <h2 style={{ marginTop: "-20px" }}>
                            {weatherData?.current.wind.speed}km/h
                          </h2>
                        </div>
                        <div className="clouds">
                          <p
                            style={{
                              display: "flex",
                              gap: "2px",
                              marginLeft: "-10px",
                            }}
                          >
                            <CiCloudOn size={15} />
                            Clouds
                          </p>
                          <br />
                          <h2
                            style={{ marginLeft: "-29px", marginTop: "-20px" }}
                          >
                            {weatherData?.current.clouds.all}%
                          </h2>
                        </div>
                        <div className="humidity">
                          <p style={{ display: "flex", marginLeft: "-10px" }}>
                            <WiHumidity size={15} />
                            Humidity
                          </p>
                          <br />
                          <h2
                            style={{ marginLeft: "-85px", marginTop: "-20px" }}
                          >
                            {weatherData?.current.main.humidity}%
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DayForcast;

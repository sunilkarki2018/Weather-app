//import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherItem(props) {
  //const [cityname, setCityname] = useState("Jyväskylä");
  const [weather, setWeather] = useState(null);

  const API_KEY = "9b25aba291d3447db06012134cfa0473";
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ICON_URL = "http://openweathermap.org/img/wn/";

  const getWeather = () => {
    axios
      .get(URL + props.city + "&appid=" + API_KEY + "&units=metric")
      .then((response) => {
        //console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        // Error
        if (error) {
          alert("Error while fetching");
        }
        console.log(error.message);
      });
  };

  // use effect to load data
  useEffect(() => {
    getWeather();
  }, []); // load once, use => []

  return (
    <>
      {weather !== null && (
        <div>
          {weather.name}
          {"     "}
          {weather.weather[0].main}
          {"     "}
          {weather.main.temp} °C Feels: {weather.main.feels_like} °C{"     "}
          {weather.main.temp_min} - {weather.main.temp_max} °C{"     "}
          <img
            alt={props.city}
            style={{ height: 100, width: 100 }}
            src={ICON_URL + weather.weather[0].icon + ".png"}
          />
        </div>
      )}

      {weather === null && <p> Data not available</p>}
    </>
  );
}

export default WeatherItem;

import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleWeatherSearch = async () => {
    const API_KEY = "9b25aba291d3447db06012134cfa0473";
    try {
      const currentWeatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9b25aba291d3447db06012134cfa0473`
      );
      const forecastWeatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9b25aba291d3447db06012134cfa0473`
      );
      setCurrentWeather(currentWeatherData.data);
      setForecastWeather(forecastWeatherData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleCityChange} />
      <button onClick={handleWeatherSearch}>Search</button>

      {currentWeather && (
        <div>
          <h2>{currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp} F</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {forecastWeather && (
        <div>
          <h2>5-day forecast</h2>
          {forecastWeather.list.map((forecast) => (
            <li key={forecast.dt}>
              <div>Date: {forecast.dt_txt}</div>
              <div>Temperature: {forecast.main.temp}</div>
              <div>Weather: {forecast.weather[0].description}</div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

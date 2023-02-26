import { useState, useEffect } from "react";
import WeatherItem from "./WeatherItem";
import axios from "axios";

function WeatherList() {
  //const [cityname, setCityname] = useState("Jyväskylä");
  const [cities, setCities] = useState([]);
  //const cities = ["Pokhara", "Kathmandu"];

  async function fetchData() {
    try {
      let response = await axios.get("http://localhost:3000/api/city");
      // response.data is all data sent from server side
      //console.log(response.data.data);
      // response.data.data is returned cities
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // load once, use => []

  const cityWeatherItems = cities.map((city, index) => (
    <WeatherItem key={index} city={city.text} />
  ));

  return (
    <div>
      <h1>React Weather Application</h1>
      <p>
        This application will fetch a weather forecast from the OpenWeather.
        Just type city name and click Get Forecast button!
      </p>
      <h2>Loaded weather forecast</h2>
      <h2>
        {" "}
        City {"     "}Main{"     "} Temp{"     "} Feels{"     "} Min-Max
        {"     "}Image
      </h2>

      <div style={{ flex: 1, padding: 20 }}>{cityWeatherItems}</div>
    </div>
  );
}

export default WeatherList;

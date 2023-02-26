import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-js-dropdavn/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../common/Dropdown";

const getCityList = () => {
  let list = localStorage.getItem("favList");
  if (list) return JSON.parse(localStorage.getItem("favList"));
  else return [];
};
function Main() {
  const [weather, setWeather] = useState(null);
  const [favourite, setFavourite] = useState(false);

  const [cities, setCities] = useState([]);
  const [citynamefromDropdown, setCitynamefromDropdown] = useState("");
  //const [list, setList] = useState(getCityList());
  let list = getCityList();

  const API_KEY = "9b25aba291d3447db06012134cfa0473";
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ICON_URL = "http://openweathermap.org/img/wn/";

  const getWeatherFromDropdown = () => {
    console.log(citynamefromDropdown);
    if (!citynamefromDropdown) return;
    axios
      .get(URL + citynamefromDropdown + "&appid=" + API_KEY + "&units=metric")
      .then((response) => {
        // console.log(response.data) to see data in console
        setWeather(response.data);
      });
  };

  const addFavouriteFromDropdown = () => {
    if (!citynamefromDropdown) return;
    if (list.includes(citynamefromDropdown)) {
      toast("City already added as favourite!");
      return;
    }
    //setList([...list, cityname]);
    setFavourite(!favourite);
    toast("Added as favourite!");
    localStorage.removeItem("favList");
    //if (updatedList)
    localStorage.setItem(
      "favList",
      JSON.stringify([...list, citynamefromDropdown])
    );
  };

  const options = getCityList();

  async function fetchData() {
    try {
      let response = await axios.get("http://localhost:3000/api/city");
      // response.data is all data sent from server side
      console.log(response.data.data);
      // response.data.data is returned cities
      setCities(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // load once, use => []

  const onDropdownChangeHandler = (newUpdatedcity) => {
    setCitynamefromDropdown(newUpdatedcity);
    setFavourite(false);
  };

  return (
    <div>
      <h1>React Weather Application</h1>
      <p>
        This application will fetch a weather forecast from the OpenWeather.
        Just type city name and click Get Forecast button!
      </p>
      <form>
        <Dropdown options={cities} onDropdownChange={onDropdownChangeHandler} />

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => getWeatherFromDropdown()}
        >
          Get Forecast from Dropdown
        </Button>
        {!favourite ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => addFavouriteFromDropdown()}
          >
            Add as favourite for Dropdown
          </Button>
        ) : (
          <></>
        )}
      </form>

      <ToastContainer />
      <h2>Loaded weather forecast</h2>
      {weather !== null && (
        <div>
          City: {weather.name}
          <br />
          Main: {weather.weather[0].main}
          <br />
          Temp: {weather.main.temp} °C
          <br />
          Feels: {weather.main.feels_like} °C
          <br />
          Min-Max: {weather.main.temp_min} - {weather.main.temp_max} °C
          <br />
          <img
            alt={citynamefromDropdown}
            style={{ height: 100, width: 100 }}
            src={ICON_URL + weather.weather[0].icon + ".png"}
          />
        </div>
      )}

      {weather === null && <p>-</p>}
    </div>
  );
}

export default Main;

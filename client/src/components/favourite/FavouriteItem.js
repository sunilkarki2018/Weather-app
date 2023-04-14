//import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getCityList = () => {
  let list = localStorage.getItem("favList");
  //console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("favList"));
  } else return [];
};

function FavouriteItem(props) {
  //const [cityname, setCityname] = useState("Jyväskylä");
  const [weather, setWeather] = useState(null);
  const [remove, setRemove] = useState(false);

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

  const removeFavourite = (value) => {
    let cityList = getCityList();
    let uniqueCityList = [...new Set(cityList)];
    //console.log(uniqueCityList);
    console.log(value);
    let updatedList = uniqueCityList.filter((x) => x != value);
    let newVal = [...updatedList];
    localStorage.removeItem("favList");
    if (updatedList) localStorage.setItem("favList", JSON.stringify(newVal));
    props.onFavouriteRemove(newVal);
    toast("Removed from favourite!");
  };

  // use effect to load data
  useEffect(() => {
    getWeather();
  }, []); // load once, use => []

  return (
    <>
      {weather !== null && (
        <div>
          <table>
            <tbody>
              <tr style={{ display: "flex", gap: "2rem" }}>
                <td>{weather.name}</td>
                <td> {weather.weather[0].main}</td>
                <td>{weather.main.temp} °C</td>
                <td>{weather.main.feels_like} °C</td>
                <td>
                  {weather.main.temp_min} - {weather.main.temp_max} °C
                </td>
                <td>
                  <img
                    alt={props.city}
                    style={{ height: 100, width: 100 }}
                    src={ICON_URL + weather.weather[0].icon + ".png"}
                  />
                </td>
                <td>
                  {!remove ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => removeFavourite(props.city)}
                    >
                      Remove favourite
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
      {weather === null && <p> Data not available</p>}
    </>
  );
}

export default FavouriteItem;

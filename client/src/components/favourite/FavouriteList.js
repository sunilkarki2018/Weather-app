import { useState, useEffect, useHistory } from "react";
import FavouriteItem from "./FavouriteItem";

const getCityList = () => {
  let list = localStorage.getItem("favList");
  //console.log(list);
  if (list) {
    let uniqueCityList = [...new Set(JSON.parse(list))];
    //console.log(uniqueCityList);
    return uniqueCityList;
  } else return [];
};

function FavouriteList() {
  //const [cityname, setCityname] = useState("Jyväskylä");
  const [cities, setCities] = useState(getCityList());

  const onFavouriteRemoveHandler = (newUpdatedcities) => {
    console.log(newUpdatedcities);
    setCities(newUpdatedcities);
  };

  const cityWeatherItems = cities.map((city, index) => (
    <FavouriteItem
      key={index}
      city={city}
      onFavouriteRemove={onFavouriteRemoveHandler}
    />
  ));

  return (
    <div>
      <h1>React Weather Application</h1>
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

export default FavouriteList;

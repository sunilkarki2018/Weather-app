import React, { useState, useEffect } from "react";
import axios from "axios";

function City() {
  const [cities, setCities] = useState([]);
  const [newCityText, setNewCityText] = useState();

  async function fetchData() {
    try {
      let response = await axios.get("http://localhost:3000/api/city");
      // response.data is all data sent from server side
      console.log(response.data);
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

  // create li-elements from cities data
  const cityItems = cities.map((city, index) => (
    <>
      <li key={index}>
        {city.text} <span onClick={() => removeCity(city._id)}> x </span>
      </li>
    </>
  ));

  // add a new item
  const addCity = async () => {
    //console.log(`Add a new todo ${newTodoText}`);
    const data = {
      text: newCityText,
    };
    const response = await axios.post("http://localhost:3000/api/city", data);
    console.log(response.data);
    setCities([...cities, response.data.data]);
    setNewCityText("");
  };

  // remove todo
  const removeCity = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:3000/api/city/${id}`);
    // filter/remove todo item from todos state array
    let newCities = cities.filter((city) => city._id !== id);
    // modify todos state -> will render component again
    setCities(newCities);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={newCityText}
          onChange={(event) => setNewCityText(event.target.value)}
          placeholder="Write a new city here"
        />
        <input type="button" value="Add" onClick={addCity} />
      </form>
      <ul>{cityItems}</ul>
    </div>
  );
}

export default City;

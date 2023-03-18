import FavouriteList from "./components/favourite/FavouriteList";
import City from "./components/city/City";
import Main from "./components/main/Main";
import WeatherApp from "./components/test/WeatherApp";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link className="list" to="/">
              Main
            </Link>
          </li>
          <li>
            <Link className="list" to="/test">
              Test
            </Link>
          </li>
          <li>
            <Link className="list" to="/favourite">
              Favourite
            </Link>
          </li>
          <li>
            <Link className="list" to="/city">
              City
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="favourite" element={<FavouriteList />} />
        <Route path="test" element={<WeatherApp />} />
        <Route path="city" element={<City />} />
      </Routes>
    </>
  );
}

export default App;

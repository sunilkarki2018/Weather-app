import FavouriteList from "./components/favourite/FavouriteList";
import City from "./components/city/City";
import Main from "./components/main/Main";
import WeatherApp from "./components/test/WeatherApp";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/favourite">Favourite</Link>
          </li>
          <li>
            <Link to="/city">City</Link>
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

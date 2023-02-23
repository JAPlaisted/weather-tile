import { Fragment } from "react";
import LocationInformation from "./components/LocationInformation";
import WeatherInformation from "./components/WeatherInformation";
import FeelsLikeChart from "./components/FeelsLikeChart";
import PrecipitationChart from "./components/PrecipitationChart";
import VisibilityAndAirChart from "./components/VisibilityAndAirChart";
import "./App.css";

function App() {
  return (
    <Fragment className="col">
      Weather Tile
      <div className="row">
        <LocationInformation />
        <WeatherInformation />
      </div>
      <div className="row">
        <FeelsLikeChart />
        <PrecipitationChart />
        <VisibilityAndAirChart />
      </div>
    </Fragment>
  );
}

export default App;

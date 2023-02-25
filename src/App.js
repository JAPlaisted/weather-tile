import React, { useEffect, useState } from "react";
import WeatherMain from "./components/WeatherMain";
import LocalInformation from "./components/LocationInformation";
import WeatherInformation from "./components/WeatherInformation";
import FeelsLikeChart from "./components/FeelsLikeChart";
import PrecipitationChart from "./components/PrecipitationChart";
import VisibilityAndAirChart from "./components/VisibilityAndAirChart";
import Clouds from "./components/Clouds";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

const Weather = () => {
  const [location, setLocation] = useState({
    long: undefined,
    lat: undefined,
    timezone: "",
    region: "",
    country: "",
    localtime: "",
    latitude: "",
    longitude: "",
  });

  const [weather, setWeather] = useState({
    temp_c: undefined,
    temp_f: undefined,
    feelslike_c: undefined,
    feelslike_f: undefined,
    condition: { icon: "" },
    cloud: undefined,
    gust_kph: undefined,
    humidity: undefined,
    precip_mm: undefined,
    pressure_mb: undefined,
    uv: undefined,
    vis_km: undefined,
    last_updated: "",
    wind_degree: undefined,
    wind_dir: "",
    wind_kph: undefined,
  });

  const [airQuality, setAirQuality] = useState({
    "gb-defra-index": undefined,
    "us-epa-index": undefined,
    co: undefined,
    no2: undefined,
    o3: undefined,
    pm2_5: undefined,
    pm10: undefined,
    so2: undefined,
  });

  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location.long && location.lat) {
      const api = `https://api.weatherapi.com/v1/current.json?key=f778f2fa359447189e4233557212409&q=${location.lat},${location.long}&aqi=yes`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          setWeather({
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            feelslike_c: data.current.feelslike_c,
            feelslike_f: data.current.feelslike_f,
            condition: data.current.condition,
            cloud: data.current.cloud,
            gust_kph: data.current.gust_kph,
            humidity: data.current.humidity,
            precip_mm: data.current.precip_mm,
            pressure_mb: data.current.pressure_mb,
            uv: data.current.uv,
            vis_km: data.current.vis_km,
            last_updated: data.current.last_updated,
            wind_degree: data.current.wind_degree,
            wind_dir: data.current.wind_dir,
            wind_kph: data.current.wind_kph,
          });
          setLocation((prevState) => ({
            ...prevState,
            timezone: data.location.tz_id,
            region: data.location.region,
            country: data.location.country,
            localtime: data.location.localtime,
            latitude: data.location.lat,
            longitude: data.location.long,
          }));
          setAirQuality({
            "gb-defra-index": data.current.air_quality["gb-defra-index"],
            "us-epa-index": data.current.air_quality["us-epa-index"],
            co: data.current.air_quality.co,
            no2: data.current.air_quality.no2,
            o3: data.current.air_quality.o3,
            pm2_5: data.current.air_quality.pm2_5,
            pm10: data.current.air_quality.pm10,
            so2: data.current.air_quality.so2,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [location]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather-tile">
      {weather.temp_c && weather.temp_f && (
        <div>
          <div className="section--dark">
            <button className="btn" onClick={toggleTemperatureUnit}>
              {isCelsius ? "Show Fahrenheit" : "Show Celsius"}
            </button>
            <div className="mobile-row">
              <LocalInformation
                country={location.country}
                timezone={location.timezone}
                region={location.region}
                localtime={location.localtime}
                latitude={location.lat}
                longitude={location.long}
              />
              <WeatherMain
                icon={weather.condition.icon}
                condition={weather.condition.text}
                isCelsius={isCelsius}
                tempC={weather.temp_c}
                tempF={weather.temp_f}
              />
              <WeatherInformation
                icon={weather.condition.icon}
                condition={weather.condition.text}
                isCelsius={isCelsius}
                tempC={weather.temp_c}
                tempF={weather.temp_f}
                feelsLikeC={weather.feelslike_c}
                feelsLikeF={weather.feelslike_f}
                cloud={weather.cloud}
                gust={weather.gust_kph}
                humidity={weather.humidity}
                pressure={weather.pressure_mb}
                uV={weather.uv}
                visibility={weather.vis_km}
                lastUpdated={weather.last_updated}
                windDegree={weather.wind_degree}
                windDirection={weather.wind_dir}
                windSpeed={weather.wind_kph}
              />
            </div>
          </div>
          <Clouds />
          <div className="mobile-row section--light">
            <FeelsLikeChart
              isCelsius={isCelsius}
              tempC={weather.temp_c}
              tempF={weather.temp_f}
              feelsLikeC={weather.feelslike_c}
              feelsLikeF={weather.feelslike_f}
            />
            <div className="divider" />
            <VisibilityAndAirChart
              co={airQuality.co}
              no2={airQuality.no2}
              o3={airQuality.o3}
              pm25={airQuality.pm2_5}
              pm10={airQuality.pm10}
              so2={airQuality.so2}
              ukAir={airQuality["gb-defra-index"]}
              usAir={airQuality["us-epa-index"]}
            />
            <div className="divider" />
            <PrecipitationChart
              precipitation={weather.precip_mm}
              isCelsius={isCelsius}
            />
          </div>
          <p>Created By Jonathan Plaisted</p>
          <p>Powered By WeatherAPI</p>
        </div>
      )}
      {!weather.temp_c && !weather.temp_f && <LoadingScreen />}
    </div>
  );
};

export default Weather;

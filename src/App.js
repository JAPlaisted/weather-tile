import React, { useEffect, useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState({
    long: undefined,
    lat: undefined,
    timezone: "",
    region: "",
    country: "",
    localtime: "",
    lattitude: "",
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
          setLocation({
            timezone: data.location.tz_id,
            region: data.location.region,
            country: data.location.country,
            localtime: data.location.localtime,
            lattitude: data.location.lat,
            longitude: data.location.lon,
          });
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
    <div>
      {weather.temp_c && weather.temp_f && (
        <div>
          <h1>
            Current Weather in {location.region}, {location.country}
          </h1>
          <div>
            <img src={weather.condition.icon} alt={weather.condition.text} />
          </div>
          <div>
            <h2>{isCelsius ? weather.temp_c : weather.temp_f}&deg;</h2>
            <button onClick={toggleTemperatureUnit}>
              {isCelsius ? "Fahrenheit" : "Celsius"}
            </button>
          </div>
          <div>
            <p>
              Feels like:{" "}
              {isCelsius ? weather.feelslike_c : weather.feelslike_f}&deg;
            </p>
            <p>Condition: {weather.condition.text}</p>
            <p>Cloud: {weather.cloud}%</p>
            <p>Gust: {weather.gust_kph} km/h</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Precipitation: {weather.precip_mm} mm</p>
            <p>Pressure: {weather.pressure_mb} mb</p>
            <p>UV: {weather.uv}</p>
            <p>Visibility: {weather.vis_km} km</p>
            <p>Last updated: {weather.last_updated}</p>
            <p>
              Wind: {weather.wind_degree}&deg; {weather.wind_dir}{" "}
              {weather.wind_kph} km/h
            </p>
          </div>
          <div>
            <h2>Air Quality</h2>
            <p>UK Air Quality Index: {airQuality["gb-defra-index"]}</p>
            <p>US Air Quality Index: {airQuality["us-epa-index"]}</p>
            <p>Carbon Monoxide: {airQuality.co} µg/m³</p>
            <p>Nitrogen Dioxide: {airQuality.no2} µg/m³</p>
            <p>Ozone: {airQuality.o3} µg/m³</p>
            <p>Particulate Matter (2.5 µm): {airQuality.pm2_5} µg/m³</p>
            <p>Particulate Matter (10 µm): {airQuality.pm10} µg/m³</p>
            <p>Sulphur Dioxide: {airQuality.so2} µg/m³</p>
          </div>
        </div>
      )}
      {!weather.temp_c && !weather.temp_f && <div>Error Loading Data</div>}
    </div>
  );
};

export default Weather;

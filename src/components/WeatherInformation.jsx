import React from 'react';

function WeatherInformation({icon, condition, isCelsius, tempC, tempF, feelsLikeC, feelsLikeF, cloud, gust, humidity, precipitation, pressure, uV, visibility, lastUpdated, windDegree, windDirection, windSpeed}) {
    return (
        <div>
            <img src={icon} alt={condition} />
            <div>
            <h2>{isCelsius ? tempC : tempF}&deg;</h2>
            <div>
            <p>
              Feels like:{" "}
              {isCelsius ? feelsLikeC : feelsLikeF}&deg;
            </p>
            <p>Condition: {condition}</p>
            <p>Cloud: {cloud}%</p>
            <p>Gust: {gust} km/h</p>
            <p>Humidity: {humidity}%</p>
            <p>Precipitation: {precipitation} mm</p>
            <p>Pressure: {pressure} mb</p>
            <p>UV: {uV}</p>
            <p>Visibility: {visibility} km</p>
            <p>
              Wind: {windDegree}&deg; {windDirection}{" "}
              {windSpeed} km/h
            </p>
            <p>Last updated: {lastUpdated}</p>
          </div>
          </div>
          </div>
    );
}

export default WeatherInformation;
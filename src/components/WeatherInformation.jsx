import React from 'react';

function WeatherInformation({icon, condition, isCelsius, tempC, tempF, feelsLikeC, feelsLikeF, cloud, gust, humidity, precipitation, pressure, uV, visibility, lastUpdated, windDegree, windDirection, windSpeed}) {
    const convertedGust = isCelsius ? gust : gust * 0.621371;
    const convertedVisibility = isCelsius ? visibility : visibility * 0.621371;
    const convertedWindSpeed = isCelsius ? windSpeed : windSpeed * 0.621371;
    return (
        <div>
            <div className='weather-info'>
              <div>
                <img src={icon} alt={condition} style={{ height: '100px', width: '100px' }}/>
                <h2>{isCelsius ? tempC : tempF}&deg;</h2>
              </div>
              <div>
                <p>
                  Feels like:{" "}
                  {isCelsius ? feelsLikeC : feelsLikeF}&deg;
                </p>
                <p>Condition: {condition}</p>
                <p>Cloud: {cloud}%</p>
                <p>Gust: {convertedGust.toFixed(1)} {isCelsius ? 'km/h' : 'mph'}</p>
                <p>Humidity: {humidity}%</p>
                </div>
                <div>
                <p>Pressure: {pressure} mb</p>
                <p>UV: {uV}</p>
                <p>Visibility: {convertedVisibility.toFixed(1)} {isCelsius ? 'km' : 'mi'}</p>
                <p>
                  Wind: {windDegree}&deg; {windDirection}{" "}
                  {convertedWindSpeed.toFixed(1)} {isCelsius ? 'km/h' : 'mph'}
                </p>
                <p>Last updated: {lastUpdated}</p>
                </div>
            </div>
          </div>
    );
}

export default WeatherInformation;

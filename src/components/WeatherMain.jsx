import React from 'react';

function WeatherMain({icon, condition, isCelsius, tempC, tempF}) {
    return (
        <div className='weather-info'>
            <img src={icon} alt={condition} style={{ height: '100px', width: '100px' }}/>
            <h2>{isCelsius ? tempC : tempF}&deg;</h2>
        </div>
    );
}

export default WeatherMain;
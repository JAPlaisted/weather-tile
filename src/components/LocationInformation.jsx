import React from "react";

function LocalInformation ({ country, timezone, region, localtime, latitude, longitude }) {
  return (
    <div>
      <p>Country: {country}</p>
      <p>Timezone: {timezone}</p>
      <p>Region: {region}</p>
      <p>Local Time: {localtime}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default LocalInformation;

import React from 'react'
import { ResponsiveBar } from '@nivo/bar';

const FeelsLikeChart = ({ isCelsius, tempC, tempF, feelsLikeC, feelsLikeF }) => {
  const data = [        
    {             
      type: "Temp",             
      actual: isCelsius ? tempC : Math.round(tempF),            
      feelsLike: isCelsius ? feelsLikeC : Math.round(feelsLikeF),        
    },    
  ];


const colors = ["#fcb13b", "#bb4003"];
  
    return (
      <div style={{ height: '300px', width: '450px' }}>
          <ResponsiveBar
            data={[{ 
                type: "Temp", 
                value: data[0].actual,
                colors: colors[0],
                label: isCelsius ? "Actual (°C)" : "Actual (°F)"
              },
              {
                type: "Temp",
                value: data[0].feelsLike,
                colors: colors[1],
                label: isCelsius ? "Feels like (°C)" : "Feels like (°F)"
              }
            ]}
            keys={["value"]}
            indexBy="label"
            margin={{ top: 60, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={({ index }) => colors[index]}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isCelsius ? "Temperature (°C)" : "Temperature (°F)",
              legendPosition: "middle",
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
      </div>
    );
  };

export default FeelsLikeChart;

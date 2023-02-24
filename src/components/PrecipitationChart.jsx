import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const PrecipitationChart = ({ precipitation, isCelsius }) => {
  const data = [
    {
      type: isCelsius ? "Precipitation (cm)" : "Precipitation (in)",
      value: isCelsius ? precipitation : Math.round(precipitation * 0.3937 * 100) / 100
    }
  ];

  const colors = ["#1F6A90"];
  
  return (
    <div style={{ height: '300px', width: '450px' }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="type"
        margin={{ top: 60, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors}
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
          legend: isCelsius ? "Precipitation (cm)" : "Precipitation (in)",
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

export default PrecipitationChart;

import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const AirQualityScatterPlot = ({ co, no2, o3, pm25, pm10, so2, ukAir, usAir }) => {
    const data = [        
        {            
            id: 'CO',            
            data: [{ x: 'CO', y: co }],
        },
        {
            id: 'NO2',
            data: [{ x: 'NO2', y: no2 }],
        },
        {
            id: 'O3',
            data: [{ x: 'O3', y: o3 }],
        },
        {
            id: 'PM2.5',
            data: [{ x: 'PM2.5', y: pm25 }],
        },
        {
            id: 'PM10',
            data: [{ x: 'PM10', y: pm10 }],
        },
        {
            id: 'SO2',
            data: [{ x: 'SO2', y: so2 }],
        },
    ];

    const colors = ['#fcb13b', '#fca535', '#fb9c2e', '#ea8329', '#d56b23', '#bb4003'];

    return (
        <div style={{  height: '200px', width: '300px'  }}>
            <h2 style={{ marginLeft: '10px' }}>Air Quality</h2>
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 40, right: 20, bottom: 70, left: 70 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                blendMode="multiply"
                colors={colors}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                tooltip={({ node }) => (
                    <div
                        style={{
                            background: '#f5f5f5',
                            color: '#656565',
                            padding: '12px 16px',
                        }}
                    >
                        <strong>{node.data.x}</strong>
                        <br />
                        {node.data.y} µg/m³
                    </div>
                )}
            />
        </div>
    );
};

export default AirQualityScatterPlot;

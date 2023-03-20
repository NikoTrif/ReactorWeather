import React from 'react';
import OneHourForecast from './OneHourForecast';

function HourlyForecast(props) {
    console.log('HoursForecast', props.hourlyForecast[0]);

    return (
        <div>
            <h3>HourlyForecast</h3>
            {
                props.hourlyForecast.map(h => {
                    return <OneHourForecast oneHourForecast={h} />
                })
            }
        </div>
    );
}

export default HourlyForecast;
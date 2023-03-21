import React from 'react';
import OneHourForecast from './OneHourForecast';

function HourlyForecast(props) {
    let i = 0;
    console.log('HoursForecast', props.hourlyForecast[0]);

    return (
        <div>
            <h3>HourlyForecast</h3>
            {
                props.hourlyForecast.map(h => {
                    return <OneHourForecast key={(i++)} oneHourForecast={h} />
                })
            }

        </div>
    );
}

export default HourlyForecast;
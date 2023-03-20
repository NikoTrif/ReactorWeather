import React from 'react';
import { CalculateTemp } from '../backend/calculations';

function OneHourForecast(props) {
    const { oneHourForecast: { dt, main: { temp }, weather } } = props;

    function getTime(hour) {
        const time = new Date(hour * 1000).toLocaleTimeString('en-GB');
        // console.log('time', time);
        return time;
    }

    return (
        <div>
            <h5>
                {getTime(dt)}
            </h5>
            <img src={`https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png `} alt="weather icon" />
            <p>{weather[0]?.description}</p>
            <p>{CalculateTemp("C", temp)}° C</p>
        </div>
    );
}

export default OneHourForecast;
import React from 'react';
import { useSelector } from 'react-redux';
import { CalculateTemp } from '../backend/calculations';

function OneHourForecast(props) {
    const state = useSelector(state => state);
    const { oneHourForecast: { dt, main: { temp }, weather } } = props;
    const { temperatureScale: { scale } } = state;

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
            <p>{CalculateTemp(scale, temp)}° {scale}</p>
        </div>
    );
}

export default OneHourForecast;
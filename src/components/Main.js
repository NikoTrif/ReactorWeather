import React from 'react';
import CurrentWeather from './CurrentWeather';
import DayForecast from './DayForecast';

function Main() {
    return (
        <div>
            <h2>Main</h2>
            <CurrentWeather />
            <DayForecast />
        </div>
    );
}

export default Main;
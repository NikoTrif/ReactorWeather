import React from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

function Main() {
    return (
        <div>
            <h2>Main</h2>
            <CurrentWeather />
            <Forecast />
        </div>
    );
}

export default Main;
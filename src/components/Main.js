import React from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

import '../styles/sass/main.scss';

function Main() {
    return (
        <div className='main'>
            <CurrentWeather />
            <Forecast />
        </div>
    );
}

export default Main;
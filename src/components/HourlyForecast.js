import React from 'react';
import OneHourForecast from './OneHourForecast';

import '../styles/sass/hourly-forecast.scss';

function HourlyForecast(props) {
    let i = 0;

    return (
        <div className='hourly-forecast'>
            <h3>3 Hours Forecast</h3>
            <div className='hour-wrapper'>
                {
                    props.hourlyForecast.map(h => {
                        return <OneHourForecast key={(i++)} oneHourForecast={h} />
                    })
                }
            </div>

        </div>
    );
}

export default HourlyForecast;
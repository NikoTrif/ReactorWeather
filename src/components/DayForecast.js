import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HourlyForecast from './HourlyForecast';

// import '../styles/sass/helpers.scss';

function DayForecast(props) {
    const state = useSelector(state => state);
    const { temperatureScale: { scale } } = state;

    useEffect(() => {
        console.log(`Day rerendered ${props.compKey}`);
    })

    function dayForecastClick() {
        props.changeToggle(props.toggle, props.compKey, props.hourlyForecast);
    }

    return (
        <>
            <div className='one-day'>
                <button className='ui button' onClick={() => { dayForecastClick() }}>
                    <h4 className='day-name'>{props.day}</h4>
                    <h4>{props.date}</h4>
                    <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png `} alt="weatherIcon" />
                    <table>
                        <tbody>
                            <tr key={props.day + 'max'}>
                                <td>
                                    Max
                                    <br />
                                    {props.maxTemp}° {scale}
                                </td>
                            </tr>
                            <tr key={props.day + 'min'}>
                                <td>
                                    Min
                                    <br />
                                    {props.minTemp}° {scale}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </button>

                {/* {props.toggle ? <HourlyForecast hourlyForecast={props.hourlyForecast} /> : <></>} */}
            </div>
        </>
    );
}

export default DayForecast;
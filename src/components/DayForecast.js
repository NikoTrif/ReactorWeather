import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import HourlyForecast from './HourlyForecast';

function DayForecast(props) {
    const state = useSelector(state => state);
    const { temperatureScale: { scale } } = state;
    const [toggle, setToggle] = useState(false);

    function dayForecastClick(e) {
        e.preventDefault()

        setToggle(!toggle);
    }

    return (
        <div>
            <a href='#' onClick={(e) => { dayForecastClick(e) }}>
                <h4>{props.day}</h4>
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
            </a>
            {toggle ? <HourlyForecast hourlyForecast={props.hourlyForecast} /> : <></>}

        </div>
    );
}

export default DayForecast;
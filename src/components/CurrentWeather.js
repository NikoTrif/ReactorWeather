import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as calculations from '../backend/calculations';
import { fetchWeatherAction, setTemperatureScale } from '../redux/slices/weatherSlices';
import _ from 'lodash';

import HourlyForecast from './HourlyForecast';
import { LoadDays } from '../backend/separateForecast';

import '../styles/sass/app.scss';
import '../styles/sass/current-weather.scss';
import '../styles/sass/variableClasses.scss';

function CurrentWeather() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [tempCoords, setTempCoords] = useState({ lat: 0, lon: 0 });
    const { weather: { weather, loading, error } } = state;
    const { coords: { coords } } = state;
    const { temperatureScale: { scale, antiscale } } = state;
    const { forecast: { forecast } } = state;

    let todayExtracted = [];

    useEffect(() => {
        if (!_.isEqual(tempCoords, coords)) {
            dispatch(fetchWeatherAction(coords));
            setTempCoords(coords);
        }
        // console.log('Weather', weather);
    }, [coords])

    const showTemp = (temp, loading, error) => {
        if (loading === true) {
            return (
                <div className="ui segment loader-inline">
                    <div className="ui active inverted dimmer">
                        <div className='ui tiny text loader'></div>
                    </div>
                </div>
            );
        }
        if (error !== undefined) {
            return 'ERROR!';
        }
        if (weather !== undefined) {
            return calculations.CalculateTemp(scale, temp);
        }
    }

    const showStat = (stat, loading, error) => {
        if (loading === true) {
            return (
                <div className="ui segment loader-inline">
                    <div className="ui active inverted dimmer">
                        <div className='ui tiny text loader'></div>
                    </div>
                </div>
            );
        }
        if (error !== undefined) {
            return 'ERROR!';
        }
        if (weather !== undefined) {
            return stat;
        }
    }

    function changeScale() {
        dispatch(setTemperatureScale(antiscale));
    }

    function LoadToday() {
        if (forecast !== undefined) {
            todayExtracted = LoadDays(forecast, 'today');
        }
    }

    LoadToday();

    return (
        <div className='current-weather'>
            <h2>Weather Now</h2>
            <div className="temp-details-wrapper">
                <div className='current-temp'>
                    <h3><span>{showTemp(weather?.main?.temp, loading, error)}</span>° <span>{scale}</span> <span><button onClick={changeScale}>{antiscale}</button></span></h3>
                    <p>{showStat(weather?.weather[0]?.main, loading, error)}</p>
                    <p><span>Real Feel: </span><span>{showTemp(weather?.main?.feels_like)}</span>° <span>{scale}</span></p>
                </div>
                <div className='weather-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td>Wind:</td>
                                <td id="wind"><span id="wind-speed">{showStat(weather?.wind?.speed, loading, error)}</span> m/s <span id="wind-direction">{showStat(weather?.wind?.deg, loading, error)}</span>°</td>
                            </tr>
                            <tr>
                                <td>Pressure:</td>
                                <td><span id="pressure">{showStat(weather?.main?.pressure, loading, error)}</span> mb</td>
                            </tr>
                            <tr>
                                <td>Humidity:</td>
                                <td><span id="humidity">{showStat(weather?.main?.humidity, loading, error)}</span>%</td>
                            </tr>
                            <tr>
                                <td>Visibility:</td>
                                <td><span id="visibility">{showStat(weather?.visibility, loading, error)}</span> m</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <HourlyForecast hourlyForecast={todayExtracted} />
        </div>
    );
}

export default CurrentWeather;
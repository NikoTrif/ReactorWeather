import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as calculations from '../backend/calculations';
import { fetchWeatherAction } from '../redux/slices/weatherSlices';

function CurrentWeather() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { weather: { weather, loading, error } } = state;
    const { coords: { coords } } = state;

    useEffect(() => {
        // dispatch(fetchWeatherAction(coords));
    }, [])

    const showTemp = (temp, loading, error) => {
        if (loading === true) {
            return 'Loading...';
        }
        if (error !== undefined) {
            return 'ERROR!';
        }
        if (weather !== undefined) {
            return calculations.CalculateTemp("C", temp);
        }
    }

    const showStat = (stat, loading, error) => {
        if (loading === true) {
            return 'Loading...';
        }
        if (error !== undefined) {
            return 'ERROR!';
        }
        if (weather !== undefined) {
            return stat;
        }
    }

    return (
        <div>
            <h3>CurrentWeather</h3>
            <div>
                <h2><span>{showTemp(weather?.main?.temp, loading, error)}</span>° <span>C</span> <span><button>F</button></span></h2>
                <p>{showStat(weather?.weather[0]?.main, loading, error)}</p>
                <p><span>Real Feel:</span><span>{showTemp(weather?.main?.feels_like)}</span>° <span>C</span></p>
            </div>
            <div>
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
    );
}

export default CurrentWeather;
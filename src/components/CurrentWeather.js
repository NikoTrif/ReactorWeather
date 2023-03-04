import React from 'react';
import { useSelector } from 'react-redux';

function CurrentWeather() {
    const state = useSelector(state => state);
    const { weather, loading, error } = state;

    const CalculateTemp = (unit, value) => {
        if (unit === "C") {
            return Math.floor(value - 273.15);
        }
        else if (unit === "F") {
            return Math.floor((value - 273.15) * (9 / 5) + 32);
        }
    }

    const currentTemp = (weather, loading, error) => {
        if (loading === true) {
            return 'Loading...';
        }
        else if (error !== undefined) {
            return 'ERROR!';
        }
        else if (weather !== undefined) {
            return CalculateTemp("C", weather?.main?.temp);
        }
    }

    return (
        <div>
            <h3>CurrentWeather</h3>
            <div>
                <h2><span>{currentTemp(weather, loading, error)}</span>° <span>C</span> <span><button>F</button></span></h2>
                <p>Sunny</p>
                <p><span>Real Feel:</span><span>35</span>° <span>C</span></p>
                {/* <h2>{cTemp}°{unit} <span><button>{unusedUnit}</button></span></h2>
                <p>{weather}</p>
                <p>Real Feel: {rfTemp}°{unit}</p> */}
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Wind:</td>
                            <td id="wind"><span id="wind-speed">20</span> m/s <span id="wind-direction">30</span>°</td>
                        </tr>
                        <tr>
                            <td>Preasure:</td>
                            <td><span id="pressure">1001</span> mb</td>
                        </tr>
                        <tr>
                            <td>Humidity:</td>
                            <td><span id="humidity">60</span>%</td>
                        </tr>
                        <tr>
                            <td>Visibility:</td>
                            <td><span id="visibility">100</span> m</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CurrentWeather;
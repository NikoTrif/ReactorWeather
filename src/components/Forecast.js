import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DayForecast from './DayForecast';
import * as calculations from '../backend/calculations';
import _ from 'lodash';
import { fetchForecastAction } from '../redux/slices/weatherSlices';


function Forecast() {
    const forecastExtracted = [];
    class OneDayForecast {
        constructor() {
            this.date = new Date();
            this.min = 1000;
            this.max = 0;
            this.icon = "";
            this.hourlyForecastArray = [];
        }
    }

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { coords: { coords }, forecast: { forecast, loading, error } } = state;
    const { temperatureScale: { scale } } = state;
    const [tempCoords, setTempCoords] = useState({ lat: 0, lon: 0 });
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if (!_.isEqual(tempCoords, coords)) {
            dispatch(fetchForecastAction(coords));
            setTempCoords(coords);
        }
    }, [coords])


    const LoadDays = () => {
        if (forecast !== undefined) {
            let dat;
            let datTemp = new Date();
            let odf = new OneDayForecast();

            forecast?.list.forEach((h, index) => {
                dat = new Date(h.dt * 1000);

                if (dat.toLocaleDateString() !== new Date().toLocaleDateString()) {
                    if (datTemp.toLocaleDateString() === new Date().toLocaleDateString()) {
                        datTemp = dat;
                    }
                    if (datTemp.toLocaleDateString() === dat.toLocaleDateString()) {
                        if (h?.main?.temp_min < odf.min) {
                            odf.min = h?.main?.temp_min;
                        }
                        if (h?.main?.temp_max > odf.max) {
                            odf.max = h?.main?.temp_max;
                        }
                        odf.hourlyForecastArray.push(h);
                    }
                    else {
                        odf.date = datTemp;
                        odf.icon = (h?.weather[0]?.icon).replace('n', 'd');
                        forecastExtracted.push(odf);
                        odf = new OneDayForecast();
                        datTemp = dat;
                        if (h?.main?.temp_min < odf.min) {
                            odf.min = h?.main?.temp_min;
                        }
                        if (h?.main?.temp_max > odf.max) {
                            odf.max = h?.main?.temp_max;
                        }
                        odf.hourlyForecastArray.push(h)
                    }

                    if (index === forecast?.list.length - 1) {
                        odf.date = datTemp;
                        odf.icon = (h?.weather[0]?.icon).replace('n', 'd');
                        forecastExtracted.push(odf);
                    }
                }
            });
        }
    }

    LoadDays();

    return (
        <Fragment>
            <h3>Forecast</h3>
            {
                forecastExtracted.map((day, i) => {
                    if (forecastExtracted.length !== 0) {
                        return <DayForecast
                            key={i}
                            day={weekday[day?.date.getDay()]}
                            date={day?.date.toLocaleDateString('sr-RS')}
                            minTemp={calculations.CalculateTemp(scale, day?.min)}
                            maxTemp={calculations.CalculateTemp(scale, day?.max)}
                            icon={day?.icon}
                            hourlyForecast={day?.hourlyForecastArray} />
                    }
                })
            }
        </Fragment>
    );
}

export default Forecast;
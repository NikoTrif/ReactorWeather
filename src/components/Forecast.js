import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import DayForecast from './DayForecast';
import * as calculations from '../backend/calculations';

function Forecast() {
    const forecastExtracted = [];
    class OneDayForecast {
        constructor() {
            this.date = new Date();
            this.min = 1000;
            this.max = 0;
            this.icon = "";
        }
    }

    const state = useSelector(state => state);
    const { forecast: { forecast, loading, error } } = state;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
    // console.log("DayForecast");
    // console.log(forecast);

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
                            minTemp={calculations.CalculateTemp("C", day?.min)}
                            maxTemp={calculations.CalculateTemp("C", day?.max)}
                            icon={day?.icon} />
                    }
                })
            }
        </Fragment>
    );
}

export default Forecast;
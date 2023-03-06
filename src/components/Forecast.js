import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import DayForecast from './DayForecast';

function Forecast() {
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
    // console.log("DayForecast");
    // console.log(forecast);

    const LoadDays = () => {
        if (forecast !== undefined) {
            let dat;
            let datTemp = Date();
            let odf = new OneDayForecast();
            const forecastExtracted = [];
            forecast?.list.forEach(h => {

                dat = new Date(h.dt * 1000);

                if (dat.toLocaleDateString() !== new Date().toLocaleDateString()) {
                    if (datTemp !== undefined) {
                        if (datTemp.toLocaleDateString() === dat.toLocaleDateString()) {
                            if (h?.main?.temp_min < odf.min) {
                                odf.min = h?.main?.temp_min;
                            }
                            if (h?.main?.temp_max > odf.max) {
                                odf.max = h?.main?.temp_max;
                            }
                        }
                        else {
                            odf = new OneDayForecast();
                            odf.date = dat.toLocaleDateString();
                        }
                    }
                    else {
                        datTemp = dat;
                    }
                }

            });
        }
    }

    LoadDays(forecast);

    return (
        <Fragment>
            <h2>Forecast</h2>
            <DayForecast />
        </Fragment>
    );
}

export default Forecast;
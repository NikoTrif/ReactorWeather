/**
 * 
 * @param {Array} forecast openweathermap.org array with all provided days forecast
 * @param {string} forecastType if "today" it will return todayExtracted with hourly forecast for today, if "five-days" it will return forecastExtracted with all provided days forecast except today
 */
export function LoadDays(forecast, forecastType) {
    const forecastExtracted = [];
    const todayExtracted = [];
    class OneDayForecast {
        constructor() {
            this.date = new Date();
            this.min = 1000;
            this.max = 0;
            this.icon = "";
            this.hourlyForecastArray = [];
        }
    }

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
            else {
                todayExtracted.push(h);
            }
        });

        switch (forecastType) {
            case 'today':
                return todayExtracted;
            case 'five-days':
                return forecastExtracted;
            default:
                return undefined;

        }
    }
}
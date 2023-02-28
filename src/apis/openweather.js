import axios from 'axios';

export function CallWeather(lat, lon) {
    let apiKey = 'a043fe65d728314064a9719e20ff126f';

    return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}

export default axios.create({
    baseURL: CallWeather()
});
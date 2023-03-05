export function CallWeather(lat, lon) {
    const apiKey = 'a043fe65d728314064a9719e20ff126f';
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}

export function CallForecast(lat, lon) {
    const apiKey = '8e1cf7d0e536d5b4b9e3ab3ff361aaf5';
    return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}

// export default axios.create({
//     baseURL: CallWeather()
// });
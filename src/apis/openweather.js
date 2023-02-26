import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a043fe65d728314064a9719e20ff126f'
});
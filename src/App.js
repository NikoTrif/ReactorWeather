import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';
import { fetchWeatherAction, fetchWeatherData } from './redux/slices/weatherSlices';

function App() {
    const dispatch = useDispatch();
    const coord = {
        lat: 0,
        lon: 0
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            coord.lat = position.coords.latitude;
            coord.lon = position.coords.longitude;
            // coord.lat = 44.78;
            // coord.lon = 20.45;
            dispatch(fetchWeatherAction(coord));
        }, (error) => {
            console.log(error);
        }, []);
    });

    // const state = useSelector((state) => state);
    // console.log(state);
    // navigator.geolocation.getCurrentPosition((position) => {
    //     coord.lat = position.coords.latitude;
    //     coord.lon = position.coords.longitude;
    //     dispatch(fetchWeatherData(coord));
    // });

    // async function GetWeather(lat, lon) {
    //     const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a043fe65d728314064a9719e20ff126f`);
    //     console.log(weather);
    // }

    // GetWeather(44.78, 20.45);
    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
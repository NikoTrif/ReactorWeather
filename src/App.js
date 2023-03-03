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
            dispatch(fetchWeatherAction(coord));
        }, (error) => {
            console.log(error);
        }, []);
    });

    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
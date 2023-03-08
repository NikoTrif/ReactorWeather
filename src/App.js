import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction, fetchForecastAction } from './redux/slices/weatherSlices';
import * as loaders from './backend/loaders';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';

function App() {
    const dispatch = useDispatch();
    const coord = {
        lat: 0,
        lon: 0
    };

    const getWorld = () => {
        fetch(
            'worldcities.json',
            {
                headers: {
                    'Connect-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(
            function (response) {
                console.log(response);
            }
        ).then(function (cities) {
            console.log(cities);
        });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            coord.lat = position.coords.latitude;
            coord.lon = position.coords.longitude;
            dispatch(fetchWeatherAction(coord));
            dispatch(fetchForecastAction(coord));
            getWorld();
        }, (error) => {
            console.log(error);
        });

    }, []);

    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
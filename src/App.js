import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherAction, fetchForecastAction, fetchWorldAction } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const coord = {
            lat: 0,
            lon: 0
        };
        navigator.geolocation.getCurrentPosition((position) => {
            coord.lat = position.coords.latitude;
            coord.lon = position.coords.longitude;
            dispatch(fetchWeatherAction(coord));
            dispatch(fetchForecastAction(coord));
            dispatch(fetchWorldAction('http://localhost:3000/worldcities.json'));
        }, (error) => {
            console.log(error);
        });

    }, [dispatch]);

    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
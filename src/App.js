import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction, fetchForecastAction, fetchWorldAction, selectedCityAction, fetchOWCityAction } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';

function App() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { owCity } = state;

    useEffect(() => {
        const coord = {
            lat: 0,
            lon: 0
        };
        navigator.geolocation.getCurrentPosition((position) => {
            coord.lat = position.coords.latitude;
            coord.lon = position.coords.longitude;
            console.log(position);
            dispatch(fetchOWCityAction(coord));
            dispatch(fetchWeatherAction(coord));
            dispatch(fetchForecastAction(coord));
            dispatch(fetchWorldAction('http://localhost:3000/worldcities.json'));
        }, (error) => {
            console.log(error);
        });

    }, [dispatch]);

    return (
        <div>
            <Head city={state.owCity.name} country={state.owCity.country} />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction, fetchForecastAction, fetchWorldAction, selectedCityAction, fetchOWCityAction } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';
import axios from 'axios';
import { callCity } from './apis/openweather';

function App() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { owCity, city } = state;
    const [grad, setGrad] = useState({ name: '', country: '' });

    async function LoadCityData(coord) {
        const { data } = await axios.get(callCity(coord.lat, coord.lon));
        setGrad({ name: data[0]?.name, country: data[0]?.country });
        console.log('App->LoadCityData->grad');
        // console.log(data);
        console.log(grad);
        // if (grad.name !== '' && grad.country !== '') {
        // dispatch(selectedCityAction(grad));
        // }
    }

    useEffect(() => {
        const coord = {
            lat: 0,
            lon: 0
        };
        navigator.geolocation.getCurrentPosition(async (position) => {
            coord.lat = position.coords.latitude;
            coord.lon = position.coords.longitude;

            // const { data } = await axios.get(callCity(coord.lat, coord.lon));
            // setGrad({ name: data[0]?.name, country: data[0]?.country });

            // dispatch(selectedCityAction(grad));
            // dispatch(fetchOWCityAction(coord));
            await LoadCityData(coord);

            console.log('App->useEffect->owCity');
            console.log(owCity);

            // if (owCity.loading !== true) {
            //     let owCityResponse = owCity?.owCity;

            //     // dispatch(selectedCityAction({ name: owCityResponse?.name, country: owCityResponse?.country }));
            //     // console.log('App->useEffect->city');
            //     // console.log(city);
            // }
            dispatch(selectedCityAction(grad));

            dispatch(fetchWeatherAction(coord));
            dispatch(fetchForecastAction(coord));
            dispatch(fetchWorldAction('http://localhost:3000/worldcities.json'));
            // dispatch
            // LoadCityData(coord);
        }, (error) => {
            console.log(error);
        });

    }, [dispatch], grad);

    return (
        <div>
            <Head city={grad.name} country={grad.country} />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
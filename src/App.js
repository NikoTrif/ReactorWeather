import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer, { fetchWeatherAction, fetchForecastAction, fetchWorldAction, selectedCityAction, fetchOWCityAction, getCoords } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';
import axios from 'axios';
import { callCity } from './apis/openweather';

function App() {
    const dispatch = useDispatch();
    dispatch(getCoords);
    const state = useSelector(state => state);
    const [location, setLocation] = useState({ lat: 0, lon: 0 });


    useEffect(() => {
        LoadCurrentLocation();
        dispatch(getCoords(location));

        console.log('location');

        console.log(location);
        console.log('state');
        console.log(state.coords);

    }, [state]);

    function LoadCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        }, (error) => {
            console.log(error.message);
        });
    }

    // const { owCity, city } = state;
    // const [grad, setGrad] = useState({ name: '', country: '' });



    // useEffect(() => {
    //     dispatch(currentCoords);
    // }, []);
    // useEffect(() => {
    //     const coord = {
    //         lat: 0,
    //         lon: 0
    //     };
    //     navigator.geolocation.getCurrentPosition(async (position) => {
    //         coord.lat = position.coords.latitude;
    //         coord.lon = position.coords.longitude;

    //         // const { data } = await axios.get(callCity(coord.lat, coord.lon));
    //         // setGrad({ name: data[0]?.name, country: data[0]?.country });

    //         // dispatch(selectedCityAction(grad));
    //         // dispatch(fetchOWCityAction(coord));
    //         const { data } = await axios.get(callCity(coord.lat, coord.lon));

    //         if (grad.name !== data[0]?.name && grad.country !== data[0]?.country) {
    //             setGrad({ name: data[0]?.name, country: data[0]?.country });
    //             console.log('App->LoadCityData->grad');
    //             // console.log(data);
    //             console.log(grad);
    //             // if (grad.name !== '' && grad.country !== '') {
    //             dispatch(selectedCityAction(grad));
    //             // }
    //         }

    //         console.log('App->useEffect->owCity');
    //         console.log(owCity);

    //         // if (owCity.loading !== true) {
    //         //     let owCityResponse = owCity?.owCity;

    //         //     // dispatch(selectedCityAction({ name: owCityResponse?.name, country: owCityResponse?.country }));
    //         //     // console.log('App->useEffect->city');
    //         //     // console.log(city);
    //         // }
    //         // dispatch(selectedCityAction(grad));

    //         //dispatch(fetchWeatherAction(coord));
    //         dispatch(fetchForecastAction(coord));
    //         dispatch(fetchWorldAction('http://localhost:3000/worldcities.json'));
    //         // dispatch
    //         // LoadCityData(coord);
    //     }, (error) => {
    //         console.log(error);
    //     });

    // }, [dispatch]);

    // async function LoadCityData(coord) {
    //     const { data } = await axios.get(callCity(coord.lat, coord.lon));

    //     if (grad.name !== data[0]?.name && grad.country !== data[0]?.country) {
    //         setGrad({ name: data[0]?.name, country: data[0]?.country });
    //         console.log('App->LoadCityData->grad');
    //         // console.log(data);
    //         console.log(grad);
    //         // if (grad.name !== '' && grad.country !== '') {
    //         dispatch(selectedCityAction(grad));
    //         // }
    //     }
    // }
    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
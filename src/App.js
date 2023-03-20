import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorldAction, getCoords } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';

function App() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { coords: { coords } } = state;
    const [loc, setLoc] = useState({ lat: 0, lon: 0 });


    useEffect(() => {
        LoadCurrentLocation();
        dispatch(getCoords(loc));
    }, [loc]);

    useEffect(() => {
        dispatch(fetchWorldAction('http://localhost:3000/worldcities.json'));
    }, []);

    function LoadCurrentLocation() {
        if (loc.lat === 0 && loc.lon === 0) {
            navigator.geolocation.getCurrentPosition(position => {
                setLoc({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, error => {
                console.log(error.message);
            });
        }
    }

    return (
        <div>
            <Head />
            <Main />
            <Foother />
        </div>
    );
}

export default App;
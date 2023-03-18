import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoords } from './redux/slices/weatherSlices';

import Foother from './components/Foother';
import Head from './components/Head';
import Main from './components/Main';

function App() {
    const dispatch = useDispatch();
    dispatch(getCoords);
    const [loc, setLoc] = useState({ lat: 0, lon: 0 });


    useEffect(() => {
        LoadCurrentLocation();
        console.log('Loc');
        console.log(loc);

        dispatch(getCoords(loc));


    }, [loc]);

    function LoadCurrentLocation() {
        console.log('LoadCurrentLocation');
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
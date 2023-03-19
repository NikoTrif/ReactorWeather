import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAction } from '../redux/slices/weatherSlices';
import SearchSelect from './SearchSelect';
import _ from 'lodash';

//USE BIGDATACLOUD API HERE

function Head() {
    const state = useSelector(state => state);
    const { coords: { coords }, city: { city } } = state;
    const [tempCoords, setTempCoords] = useState({ lat: 0, lon: 0 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (!_.isEqual(tempCoords, coords)) {
            //ODKOMENTUJ
            dispatch(fetchCityAction(coords));
            console.log('tempCoords', { temp: tempCoords, coords: coords });
            setTempCoords(coords);
        }
        console.log('Coords', coords);
    }, [coords]);

    // useEffect(() => {
    //     dispatch(changeCity({
    //         name: owCity?.owCity?.name,
    //         country: owCity?.owCity?.country
    //     }));

    // }, [owCity]);

    return (
        <div>
            <h1>Reactor Weather</h1>
            <button>{city?.city}, {city?.countryName}</button>
            <br />
            <SearchSelect />
        </div >
    );
}

export default Head;
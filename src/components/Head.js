import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAction, setSearchSelectToggle } from '../redux/slices/weatherSlices';
import SearchSelect from './SearchSelect';
import _ from 'lodash';

import '../styles/sass/head.scss';

function Head() {
    const state = useSelector(state => state);
    const [tempCoords, setTempCoords] = useState({ lat: 0, lon: 0 });

    const { coords: { coords }, city: { city } } = state;
    const { searchSelectToggle: { toggle } } = state;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!_.isEqual(tempCoords, coords)) {
            dispatch(fetchCityAction(coords));
            setTempCoords(coords);
        }
    }, [coords]);

    return (
        <div className='head'>
            <h1>Reactor Weather</h1>
            <button onClick={() => { dispatch(setSearchSelectToggle(!toggle)) }}>{city?.city}, {city?.countryName}</button>
            <br />
            {toggle ? <SearchSelect /> : <></>}
        </div >
    );
}

export default Head;
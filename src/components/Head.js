import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchOWCityAction, getCoords } from '../redux/slices/weatherSlices';
// import { currentCoords } from '../redux/slices/weatherSlices';
import SearchSelect from './SearchSelect';

function Head(props) {
    const state = useSelector(state => state);
    const { coords: { coords }, owCity, city: { city } } = state;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOWCityAction(coords));
    }, [coords]);

    useEffect(() => {
        dispatch(changeCity({
            name: owCity?.owCity?.name,
            country: owCity?.owCity?.country
        }));

    }, [owCity]);

    return (
        <div>
            <h1>Reactor Weather</h1>
            <button>{city?.name}, {city?.country}</button>
            <SearchSelect />
        </div >
    );
}

export default Head;
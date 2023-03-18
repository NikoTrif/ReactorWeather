import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchOWCityAction } from '../redux/slices/weatherSlices';
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
            <br />
            <SearchSelect />
        </div >
    );
}

export default Head;
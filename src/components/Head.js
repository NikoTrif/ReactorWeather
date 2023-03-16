import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoords } from '../redux/slices/weatherSlices';
// import { currentCoords } from '../redux/slices/weatherSlices';
import SearchSelect from './SearchSelect';

function Head(props) {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const buttonText = {
        city: '',
        country: ''
    };
    // console.log('Head->props');
    // console.log(props);



    return (
        <div>
            <h1>Reactor Weather</h1>
            <button onClick={() => dispatch(getCoords)}>{props.city}, {props.country}</button>
            <SearchSelect />
        </div >
    );
}

export default Head;
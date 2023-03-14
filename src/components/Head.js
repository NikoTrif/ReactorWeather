import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchSelect from './SearchSelect';

function Head(props) {
    const state = useSelector(state => state);
    const buttonText = {
        city: '',
        country: ''
    };



    return (
        <div>
            <h1>Reactor Weather</h1>
            <button>{props.city}, {props.country}</button>
            <SearchSelect />
        </div >
    );
}

export default Head;
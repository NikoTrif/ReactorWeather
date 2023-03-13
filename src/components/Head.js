import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchSelect from './SearchSelect';

function Head() {
    const state = useSelector(state => state);
    // const {city}
    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><button>Beograd, Srbija</button></h2>
            <SearchSelect />
        </div >
    );
}

export default Head;
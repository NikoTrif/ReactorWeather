import React, { useEffect, useState } from 'react';
import SearchSelect from './SearchSelect';

function Head() {
    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><button>Beograd, Srbija</button></h2>
            <SearchSelect />
        </div >
    );
}

export default Head;
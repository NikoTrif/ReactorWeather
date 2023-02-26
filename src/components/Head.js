import React from 'react';
import { Link } from 'react-router-dom';

function Head() {
    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><Link to={'/'}>Belgrade, Serbia</Link></h2>
            <input type="text" />
            <div>
                <select name='CitySelect' id='citySelect' multiple aria-label='multiple select'></select>
            </div>
        </div>
    );
}

export default Head;
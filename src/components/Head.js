import React from 'react';

function Head() {
    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><button>Beograd, Srbija</button></h2>
            <input type="text" />
            <div>
                <select name='CitySelect' id='citySelect' multiple aria-label='multiple select'></select>
            </div>
        </div>
    );
}

export default Head;
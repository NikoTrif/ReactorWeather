import React from 'react';

function SelectorOptions(props) {
    if (props !== undefined)
        return (
            <option value={`${props.lat}, ${props.lon}`}>{props.city}, {props.country}</option>
        );
    else {
        return
    }
}

export default SelectorOptions;
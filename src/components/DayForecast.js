import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastAction } from '../redux/slices/weatherSlices';

function DayForecast(props) {
    return (
        <h4>{props.day}</h4>
    );
}

export default DayForecast;
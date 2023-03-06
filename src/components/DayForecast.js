import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastAction } from '../redux/slices/weatherSlices';

function DayForecast() {

    // const dispatch = useDispatch();
    // const coord = {
    //     lat: 0,
    //     lon: 0
    // };



    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         coord.lat = position.coords.latitude;
    //         coord.lon = position.coords.longitude;
    //         dispatch(fetchForecastAction(coord));
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }, []);

    const state = useSelector(state => state);
    console.log("DayForecast");
    console.log(state);

    return (
        // <div>
        //     <table>
        //         <tr>
        //             <td>Temp:</td>
        //             <td>weather</td>
        //         </tr>
        //     </table>
        // </div>
        <h3>DayForecast</h3>
    );
}

export default DayForecast;
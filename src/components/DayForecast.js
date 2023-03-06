import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastAction } from '../redux/slices/weatherSlices';

function DayForecast() {
    return (
        // <div>
        //     <table>
        //         <tr>
        //             <td>Temp:</td>
        //             <td>forecast.lin</td>
        //         </tr>
        //     </table>
        // </div>
        <h3>DayForecast</h3>
    );
}

export default DayForecast;
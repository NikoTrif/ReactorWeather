import React from 'react';

function DayForecast(props) {
    return (
        <div>
            <h4>{props.day}</h4>
            <h4>{props.date}</h4>
            <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png `} alt="weatherIcon" />
            <table>
                <tbody>
                    <tr key={props.day + 'max'}>
                        <td>
                            Max
                            <br />
                            {props.maxTemp}
                        </td>
                    </tr>
                    <tr key={props.day + 'min'}>
                        <td>
                            Min
                            <br />
                            {props.minTemp}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DayForecast;
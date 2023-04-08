import React from 'react';

import clearD from '../video/clear-d.mp4';
import clearN from '../video/clear-n.mov';
import cloudD from '../video/cloud-d.mp4';
import cloudN from '../video/cloud-n.mp4';
import mistD from '../video/mist-d.mp4';
import mistN from '../video/mist-n.mp4';
import rainD from '../video/rain-d.mp4';
import rainN from '../video/rain-n.mp4';
import thunderD from '../video/thunder-d.mp4';
import thunderN from '../video/thunder-n.mp4';
import snowD from '../video/snow-d.mp4';
import snowN from '../video/snow-n.mp4';

import '../styles/sass/background.scss';
import { useSelector } from 'react-redux';

function Background(props) {
    const state = useSelector(state => state);

    const { weather: { loading, error, weather } } = state;

    function SelectBackground() {
        let sunrise = new Date(weather?.sys?.sunrise * 1000);
        let sunset = new Date(weather?.sys?.sunset * 1000);
        let misty = ["Mist",]

    }

    function LoadBackground() {
        if (loading) {
            return (
                <div className="ui segment video-background">
                    <div className="ui active dimmer">
                        <div className="ui massive text loader"></div>
                    </div>
                </div>
            )
        }
        else {
            SelectBackground();
            return (
                <video className='video-background' autoPlay loop muted>
                    <source src={snowN} type='video/mp4' />
                </video>
            )
        }
    }


    return (
        <>{LoadBackground()}</>
    );
}

export default Background;
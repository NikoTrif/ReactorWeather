import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import clearD from '../video/clear-d.mp4';
import clearN from '../video/clear-n.mov';
import cloudsD from '../video/cloud-d.mp4';
import cloudsN from '../video/cloud-n.mp4';
import mistD from '../video/mist-d.mp4';
import mistN from '../video/mist-n.mp4';
import rainD from '../video/rain-d.mp4';
import rainN from '../video/rain-n.mp4';
import thunderD from '../video/thunder-d.mp4';
import thunderN from '../video/thunder-n.mp4';
import snowD from '../video/snow-d.mp4';
import snowN from '../video/snow-n.mp4';

import '../styles/sass/background.scss';
import { includes } from 'lodash';

function Background() {
    const state = useSelector(state => state);

    const { weather: { loading, error, weather } } = state;

    function SelectBackground() {
        let timeNow = new Date();
        let sunrise = new Date(weather?.sys?.sunrise * 1000);
        let sunset = new Date(weather?.sys?.sunset * 1000);
        let misty = ["Mist", "Smoke", "Haze", "Fog"];
        let conditionExtracted = weather?.weather[0]?.main;

        switch (conditionExtracted) {
            case 'Clear':
                if (timeNow > sunrise && timeNow < sunset) {
                    return clearD;
                }
                else {
                    return clearN;
                }
            case 'Clouds':
                if (timeNow > sunrise && timeNow < sunset) {
                    return cloudsD;
                }
                else {
                    return cloudsN;
                }
            case includes(misty):
                if (timeNow > sunrise && timeNow < sunset) {
                    return mistD;
                }
                else {
                    return mistN;
                }
            case 'Rain':
                if (timeNow > sunrise && timeNow < sunset) {
                    return rainD;
                }
                else {
                    return rainN;
                }
            case 'Thunderstorm':
                if (timeNow > sunrise && timeNow < sunset) {
                    return thunderD;
                }
                else {
                    return thunderN;
                }
            case 'Snow':
                if (timeNow > sunrise && timeNow < sunset) {
                    return snowD;
                }
                else {
                    return snowN;
                }
            default:
                return clearD;
        }

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
            return (
                <video className='video-background' autoPlay loop muted>
                    <source src={SelectBackground()} type='video/mp4' />
                </video>
            )
        }
    }


    return (
        <>{LoadBackground()}</>
    );
}

export default Background;
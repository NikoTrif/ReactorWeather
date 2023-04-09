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
import ashD from '..video/ash-d.mp4';
import dustD from '../video/dust-d.mp4';
import sandD from '../video/sand-d.mp4';
import squallD from '../video/squall-d.mp4';
import squallN from '../video/squall-n.mp4';
import tornadoD from '../video/tornado-d.mp4';

import '../styles/sass/background.scss';

function Background(props) {
    return (
        <video className='video-background' autoPlay loop muted>
            <source src={snowN} type='video/mp4' />
        </video>
    );
}

export default Background;
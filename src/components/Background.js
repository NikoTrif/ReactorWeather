import React from 'react';
import clearD from '../video/clear-d.mp4';
import clearN from '../video/clear-n.mov';
import rainD from '../video/rain-d.mp4';
import rainN from '../video/rain-n.mp4';

import '../styles/sass/background.scss';

function Background(props) {
    return (
        <video className='video-background' autoPlay loop muted>
            <source src={rainN} type='video/mp4' />
        </video>
    );
}

export default Background;
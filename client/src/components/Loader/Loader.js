import React, { Component } from 'react';

import Lottie from 'react-lottie-player'

import lottieJson from './loader.json'

class Loader extends Component {
    render() {
        return (
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 250, height: 250, margin: 'auto', marginTop: 150 }}
            />
        );
    }
}

export default Loader;
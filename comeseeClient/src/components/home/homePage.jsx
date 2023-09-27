import React, { Component } from 'react';

import HS from '../../css/home/homePage.module.css';

// component
import HomePageCover from './homePageCover';
import QuickOrder from './quickOrder';
import NowPlaying from './nowPlaying';
import ComingSoon from './comingSoon';
import Recommend from './recommend';

class HomePage extends Component {
    state = {}

    render() {
        return (
            <div className={HS.Home}>

                <div className={HS.Cover}>
                    <HomePageCover />
                    <QuickOrder />
                </div>

                <div className={HS.List}>
                    <NowPlaying />
                </div>

                <div className={HS.List}>
                    <ComingSoon />
                </div>

                <div className={HS.List}>
                    <Recommend />
                </div>

            </div>
        );
    }
}

export default HomePage;
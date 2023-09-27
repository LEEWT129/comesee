import React, { Component } from 'react';

import IS from '../../css/home/infoPage.module.css';

class Score extends Component {

    state = {}

    render() {
        const { averageScore } = this.props;
        return (
            <div className={IS.Score}>
                <div className={`${IS.starscore} col-8 px-0 pb-3`}>{averageScore}</div>
                <div className={`${IS.full} col-4 px-2 pb-4`}>/5</div>
            </div>
        );
    }


}

export default Score;
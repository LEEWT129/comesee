import React, { Component } from 'react';
import imghover from '../../css/payment/imghover.module.css'

class ImgHover extends Component {
    state = {}


    render() {
        const { src, alt } = this.props;
        return (
            <div className={imghover.imgContainer}>
                <img src={src} alt={alt} />
                <button className={imghover.imgBtn} style={{ top: "52px" }} onClick={this.buyBtnOnClick}>立即訂票</button>
                <button className={imghover.imgBtn} style={{ top: "112px" }} onClick={this.movieBtnOnClick}>電影介紹</button>
            </div>
        );
    }

    buyBtnOnClick = () => {
        this.props.onBuyClick(); 
    };

    movieBtnOnClick = () => {
        this.props.onMovieClick(); 
    };
}

export default ImgHover;
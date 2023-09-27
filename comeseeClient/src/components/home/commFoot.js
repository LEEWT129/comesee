import React, { Component } from 'react';

import CMS from '../../css/home/comment.module.css';

class CommentFoot extends Component {

    state = {}

    btnStyle = {
        fontFamily: "Lucida Sans Unicode",
        border: "none",
        borderRadius: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "#F1EFE9"
    }

    btnStyleLiked = {
        color: "#AE1914",
    }

    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            likeCount: 0,
        };

    }

    handleLike = () => {
        this.setState(prevState => ({
            isLiked: !prevState.isLiked,
            likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
        }));
    };

    render() {

        const { isLiked, likeCount } = this.state;

        return (

            <div className={CMS.ia}>

                {/* 按鈕 */}
                <button
                    onClick={this.handleLike}
                    style={isLiked ? { ...this.btnStyle, ...this.btnStyleLiked } : this.btnStyle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                    // {...props}
                    >
                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                </button>

                {/* 數量 */}
                <div className={CMS.number}>{likeCount}</div>

                {/* 按鈕 */}
                {/* <button className={CMS.cmbn}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-chat"
                        viewBox="0 0 16 16"
                    // {...props}
                    >
                        <path d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                </button> */}

                {/* 數量 */}
                {/* <div className={CMS.number}>0{ }</div> */}
            </div >

        );
    }
}

export default CommentFoot;
import React, { Component } from 'react';

class BtnLarge extends Component {

    state = {}

    btnStyle = {
        width: "100px",
        height: "43px",

        border: "2px solid #B6B995",
        borderRadius: "15px",
        backgroundColor: "#B6B995",

        color: "#F1EFE9",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "25px"
    }

    btnStyleHover = {

        color: "#B6B995",
        border: "2px solid #F1EFE9",
        backgroundColor: "#F1EFE9"

    }


    render() {
        var { label, onClick } = this.props;
        var { isHovered } = this.state;
        return (
            <button
                onClick={onClick}
                style={isHovered ? { ...this.btnStyle, ...this.btnStyleHover } : this.btnStyle}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                {label}
            </button>
        );
    }

    mouseEnter = () => {
        this.setState({ isHovered: true });
    };

    mouseLeave = () => {
        this.setState({ isHovered: false });
    };
}

export default BtnLarge;
import React, { Component } from 'react';

class BtnLarge extends Component {
    state = {}

    btnStyle = {
        width: "100px",
        height: "40px",
        borderRadius: "15px",
        border: "2px solid  #A6A79B",
        backgroundColor: "#B6B995",

        color: "#F1EFE9",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "22.5px"
    }

    btnStyleHover = {
        backgroundColor: "#F1EFE9",
        color: "#A6A79B"

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
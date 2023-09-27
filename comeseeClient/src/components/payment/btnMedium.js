import React, { Component } from 'react';

class btnMedium extends Component {
    state = {}

    btnStyle = {
        width: "120px",
        height: "40px",
        borderRadius: "15px",
        border: "2px solid  #A6A79B",
        backgroundColor: "#8C8C83",

        color: "#F1EFE9",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "22.5px"
    }

    btnStyleHover = {
        backgroundColor: "#F1EFE9",
        color: "#8C8C83"
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

export default btnMedium;
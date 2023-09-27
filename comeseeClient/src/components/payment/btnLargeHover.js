import React, { Component } from 'react';

class BtnLargeHover extends Component {
    state = {}

    btnStyle = {
        width: "150px",
        height: "40px",
        marginRight:"10px",
        marginLeft:"10px",
        borderRadius: "15px",
        border: "2px solid  #A6A79B",
        backgroundColor: "#F1EFE9",

        color: "#8C8C83",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "22.5px"

    }

    btnStyleHover = {
        backgroundColor: "#8C8C83",
        color: "#F1EFE9"

    }


    render() {
        var { label, onClick } = this.props;
        var { isHovered } = this.state;
        return (
            <button
                onClick={onClick}
                style={isHovered ? {...this.btnStyle, ...this.btnStyleHover} : this.btnStyle}
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

export default BtnLargeHover;
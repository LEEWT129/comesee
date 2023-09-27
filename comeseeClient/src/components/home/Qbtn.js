import React, { Component } from 'react';

class Qbtn extends Component {

    state = {}

    btnStyle = {
        width: "160px",
        height: "50px",

        border: "2px solid #F1EFE9",
        borderRadius: "15px",
        backgroundColor: "#000000",

        color: "#F1EFE9",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "25px"

    }

    btnStyleHover = {

        color: "#F1EFE9",
        border:"none",
        backgroundColor: "#B6B995"

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

export default Qbtn;
import React, { Component } from 'react';

class BtnMovie extends Component {
    state = {
        isClicked: false,
    };

    handleClick = () => {
        this.setState((prevState) => ({
            isClicked: !prevState.isClicked,
        }), () => {
            const selectedMoviePreference = this.props.label;
            this.props.handleMoviePreference(selectedMoviePreference, this.state.isClicked);
        });
    };

    render() {
        const { label } = this.props;
        return (
            <button
                onClick={this.handleClick}
                style={{
                    width: "100px",
                    height: "35px",
                    borderRadius: "15px",
                    border: "transparent",
                    backgroundColor: this.state.isClicked ? "#F1EFE9" : "#A6A79B",
                    color: this.state.isClicked ? "#A6A79B" : "#F1EFE9",
                    textAlign: "center",
                    fontFamily: "Noto Sans TC",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "22.5px",
                    margin: "5px",
                }}
            >
                {label}
            </button>
        );
    }
}

export default BtnMovie;

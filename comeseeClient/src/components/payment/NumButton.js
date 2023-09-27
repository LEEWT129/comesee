import React, { Component } from "react";

import NB from "../../css/payment/Numbutton.module.css"

class NumButton extends Component {
    state = {
    }
    btnStyle = {
        "color": "#848586",
        "textAlign": "center",
        "fontFamily": "Noto Sans TC",
        "fontSize": "18px",
        "fontStyle": "normal",
        "fontWeight": "400",
        "lineHeight": "20px",
        "width": "80px",
        "height": "30px",
        "border": "1px solid #A6A79B",
        "background": "#F1EFE9",
        "borderRadius": "8px",
    }



    render() {
        const {maxValue1,maxValue2} =this.props
        const maxValue =  maxValue1 && maxValue2 ? (maxValue1 < maxValue2 ? maxValue1 : maxValue2 ) : maxValue2
        return (
            <span className={NB.input}>
            <React.Fragment>
                <input type="number" style={this.btnStyle} onChange={this.handleInputChange} min="0" max={maxValue} step={this.props.stepValue  || "1" } value={this.props.value || 0}/>
            </React.Fragment>
            </span>
        );
    }


    handleInputChange = (event) => {
        const inputValue = parseInt(event.target.value, 10);
        this.setState({ inputValue: isNaN(inputValue) ? 0 : inputValue });
        if (this.props.onChange) {
          this.props.onChange(inputValue);
        }
    }



}

export default NumButton;
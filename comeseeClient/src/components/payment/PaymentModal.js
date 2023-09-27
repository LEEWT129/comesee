import React, { Component } from 'react';

class PaymentModal extends Component {
    state = {}

    stopPropagation = (e) => {
        e.stopPropagation();
    }

    render() {
        const { show, children, onClose } = this.props;
        // console.log(onClose)

        const backdropStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: show ? 'block' : 'none',
            zIndex: 1000
        };

        const modalStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop:"30px",
            transform: 'translate(-50%, -50%)',
            borderRadius: "8px",
            backgroundColor: "#F1EFE9",
            width: "50%",
            height: "60%",
            overflow: 'auto',  
            zIndex: 1001
            
        };

        return (
            <div style={backdropStyle} onClick={onClose} >
                <div style={modalStyle} onClick={this.stopPropagation}>
                    {children}
                </div>
            </div>
        );
    }
}

export default PaymentModal;
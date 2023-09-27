import React from 'react';
import Registerstyle from '../../css/Frank/register.module.css';

const RegisterInput = (props) => {
    const { label, message, onChange, id, ...inputProps } = props
    return (
        <div className={Registerstyle.forminput}>
            <label className={Registerstyle.label}>{label}</label>
            <input className={Registerstyle.input} {...inputProps} onChange={onChange}></input>
            <span className={Registerstyle.message}>{message}</span>
        </div>
    )
}

export default RegisterInput
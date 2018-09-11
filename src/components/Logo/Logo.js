import React from 'react';
import logo from '../../images/logo.svg';
import './Animation.css';

const Logo = () => {

    return (
        <div className="spin-rotation" style={{width: "300px"}}>
            <img src={logo} style={{height:'100px'}} alt=""/>
        </div>
    )

}

export default Logo

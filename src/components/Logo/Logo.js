import React from 'react';
import logo from '../../images/logo.svg';
import Tilt from 'react-tilt';

const Logo = () => {

    return (
        <div style={{width: "300px"}}>
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }}>
                <img src={logo} style={{height:'100px'}}/>
            </Tilt>
        </div>
    )

}

export default Logo

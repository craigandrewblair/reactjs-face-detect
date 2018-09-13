import React from 'react';

const Navigation = (props) => {

    return (
        <nav style={{width: "300px", zIndex: "2"}}>
        { props.signinState === 'home' 
        ?
        <a onClick={props.signOutHandler} className="f3 ma4 dim pointer white">Sign Out</a>
        :
        <div></div> }
        </nav>
    )

}

export default Navigation

import React from 'react';

const Score = ({score, name}) => {

    return (
    <div>      
        <div className="f3 white">
            {`${name} Upload Score`}
        </div>  
        <br />
        <div className="f2 white">    
            {`${score}`}
        </div> 
    </div>  
    )

}

export default Score;

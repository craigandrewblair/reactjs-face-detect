import React from 'react';

const Score = ({score, name}) => {

    return (
        <div className="f2 ma4 white">
            {`${name} your upload score is ${score}`}
        </div>
    )

}

export default Score;

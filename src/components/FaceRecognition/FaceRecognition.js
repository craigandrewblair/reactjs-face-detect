import React from 'react';
import Tilt from 'react-tilt';

const FaceRecognition = ({imageUrl}) => {

    return (
        <Tilt style={{width:"40vw", padding:"30px"}}>
          <img src={imageUrl} alt=""/>
        </Tilt>
    )

}

export default FaceRecognition

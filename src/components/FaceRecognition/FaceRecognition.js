import React from 'react';
import Tilt from 'react-tilt';

const FaceRecognition = () => {

    return (
        <Tilt style={{width:"40vw", padding:"30px"}}>
          <img src="https://samples.clarifai.com/face-det.jpg"/>
        </Tilt>
    )

}

export default FaceRecognition

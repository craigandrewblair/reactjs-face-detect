import React from 'react';
import Tilt from 'react-tilt';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {

    return (
        <div>
            <Tilt style={{width:"600px", padding:"30px", margin:"30px"}}>
            <img id="uploadImage" src={imageUrl} style={{maxWidth:"500px"}} alt=""/>
            <div 
            className="bounding-box"
            style={{
                right: box.right_col,
                bottom: box.bottom_row,
                left: box.left_col,
                top: box.top_row
            }}>
            </div>
            </Tilt>
        </div>
    )

}

export default FaceRecognition

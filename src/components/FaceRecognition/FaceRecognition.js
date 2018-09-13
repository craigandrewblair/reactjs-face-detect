import React, { Component } from 'react';
import Tilt from 'react-tilt';
import './FaceRecognition.css';
import Box from './Box';

class FaceRecognition extends Component {

    constructor(props){
        super();
        this.state = {

        }
    }

    displayBox = () => {
        let boxes = [...this.props.box];
        if(this.props.box){
            return (
                <div>
                    {boxes.map((box) =>
                    <Box
                    className="bounding-box"
                    style={{
                        right: box.right_col,
                        bottom: box.bottom_row,
                        left: box.left_col,
                        top: box.top_row,
                        zIndex: "2"
                    }}/>
                    )}
                </div>
            )
        }
    }

    render(){
        return (
        
            <div style={{zIndex: "2"}}>
                <Tilt style={{width:"600px", padding:"30px", margin:"30px"}}>
                <img id="uploadImage" src={this.props.imageUrl} style={{maxWidth:"500px"}} alt=""/>
                {this.displayBox()}
                </Tilt>
            </div>
        )
    }
}

export default FaceRecognition

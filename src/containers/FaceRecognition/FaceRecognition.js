import React, { Component } from 'react';
import Tilt from 'react-tilt';
import './FaceRecognition.css';
var uniqid = require('uniqid');

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
                    <div
                    key={uniqid()}
                    style={{
                        right: box.right_col,
                        bottom: box.bottom_row,
                        left: box.left_col,
                        top: box.top_row,
                        position: "absolute",
                        boxShadow: "inset 0 0 0 3px black",
                        border: "2px solid yellow",
                        cursor: "pointer"
                    }}/>
                    )}
                </div>
            )
        }
    }

    render(){
        return (
        
            <div>
                <Tilt 
                style={{ padding:"30px", margin:"30px", zIndex:"3", display:"flex",alignItems:"center",flexDirection:"column"}}>
                <img id="uploadImage" src={this.props.imageUrl} style={{width:"700px"}} alt=""/>
                {this.displayBox()}
                </Tilt>
            </div>
        )
    }
}

export default FaceRecognition

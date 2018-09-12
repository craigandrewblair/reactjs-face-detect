import React, { Component } from 'react';
import Tilt from 'react-tilt';
import './FaceRecognition.css';

class FaceRecognition extends Component {

    constructor(props){
        super();
        this.state = {

        }
    }

    displayBox = () => {
        if(this.props.box[0]){
            console.log(this.props.box[0]);
            return(
                <div 
                className="bounding-box"
                style={{
                    right: this.props.box[0].right_col,
                    bottom: this.props.box[0].bottom_row,
                    left: this.props.box[0].left_col,
                    top: this.props.box[0].top_row
                }}>
                
                </div>
            )
        }
    }
    
    render(){
        return (
        
            <div>
                <Tilt style={{width:"600px", padding:"30px", margin:"30px"}}>
                <img id="uploadImage" src={this.props.imageUrl} style={{maxWidth:"500px"}} alt=""/>
                {this.displayBox()}

                </Tilt>
            </div>
        )
    }
}

export default FaceRecognition

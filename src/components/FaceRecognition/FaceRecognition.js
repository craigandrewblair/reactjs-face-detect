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

    createBox = () => {

    }

    displayBox = () => {
        for(let i = 0; i < this.props.box.length; i++){
            if(this.props.box[i]){
                console.log(this.props.box[i]);
                return(
                    <Box
                    className="bounding-box"
                    style={{
                        right: this.props.box[i].right_col,
                        bottom: this.props.box[i].bottom_row,
                        left: this.props.box[i].left_col,
                        top: this.props.box[i].top_row
                    }}/>
                )
            }
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

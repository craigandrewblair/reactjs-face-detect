import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Score from './components/Score/Score';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_FACE_KEY
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
        input: 'https://samples.clarifai.com/face-det.jpg',
        imageUrl: 'https://samples.clarifai.com/face-det.jpg',
        box: {}
    }
  }

  onDetectClick = () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
    .then(response =>
    this.displayBox(this.calcBoxLocation(response))
    .catch(err => console.log(err))
  )
  }

  calcBoxLocation = (location) => {
    let arr = [];
    let image = document.getElementById('uploadImage');
    let imageHeight = Number(image.height);
    let imageWidth = Number(image.width);
    for(let i = 0; i < location.outputs[0].data.regions.length; i++){
      let pos = location.outputs[0].data.regions[i].region_info.bounding_box;
      let left_col = pos.left_col * imageWidth;
      let top_row = pos.top_row * imageHeight;
      let right_col = imageWidth - (pos.right_col * imageWidth);
      let bottom_row = imageHeight - (pos.bottom_row * imageHeight);
      arr = [...arr, {top_row: top_row, bottom_row: bottom_row, left_col: left_col, right_col: right_col} ]
    }
    
    return(
      arr.map(function(item){
        return item;
      })
    )
  }

  displayBox = (boxCoords) => {
    this.setState({box: boxCoords});
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    
    return (
      <div className="App" style={{minHeight:"100vh"}}>
      {/* <Particles /> */}
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Score />
        <Navigation />
      </header>
      <main style={{width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input} detectClick={this.onDetectClick} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </main>
      </div>
    );
  }
}

export default App;

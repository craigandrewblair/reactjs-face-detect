import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Score from './components/Score/Score';
import Signin from './components/Signin/Signin';
import Particles from './components/Particles/Particles';
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
        box: {},
        signin: true
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
    let image = document.getElementById('uploadImage');
    let imageHeight = Number(image.height);
    let imageWidth = Number(image.width);
    let arr = location.outputs[0].data.regions.map(region => {
    let pos = region.region_info.bounding_box;  
    return{
        left_col: pos.left_col * imageWidth,
        top_row: pos.top_row * imageHeight,
        right_col: imageWidth - (pos.right_col * imageWidth),
        bottom_row: imageHeight - (pos.bottom_row * imageHeight)
      }
    })
    console.log(typeof(arr));
    return arr;
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
      <Particles />
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Score />
        <Navigation />
      </header>
      
      <main style={{width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
      { this.state.signin 
      ? 
      <div style={{zIndex:"2"}}>
        <Signin /> 
      </div>
      :
      <div>
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input} detectClick={this.onDetectClick} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      }
      </main>

      </div>
    );
  }
}

export default App;

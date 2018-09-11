import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Score from './components/Score/Score';
import Particles from './components/Particles/Particles';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_FACE_KEY
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
        input: ''
    }
  }

  onInputChange = (event) => {
    console.log(this.state.input);
    this.setState({
      input: event.target.value
    });
  }

  onDetectClick = () => {
    console.log('clicked');
    app.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.log(err);
    }
  );
  }

  render() {
    return (
      <div className="App" style={{position:"fixed", height:"100vh"}}>
      <Particles />
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Score />
        <Navigation />
      </header>
      <main style={{width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input} detectClick={this.onDetectClick}/>
        <FaceRecognition />
      </main>
      </div>
    );
  }
}

export default App;

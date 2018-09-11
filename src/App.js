import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import Score from './components/Score/Score';
import Particles from 'react-particles-js';

const options = {
  particles: {
    number: {
      value: 300
    },
    line_linked: {
      shadow:{
        density: {
          value_area: 800,
        }
      }
    }
  }
}

class App extends Component {

  render() {
    return (
      <div className="App" style={{position:"fixed", height:"100vh"}}>
      <Particles params={options} className="particles"/>
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Score />
        <Navigation />
      </header>
      <main style={{width:"100vw", display:"flex", justifyContent:"center"}}>
        <ImageUrlForm />
        {/* <FaceRecognition /> */}
        {/* <Detect /> */}
      </main>
      </div>
    );
  }
}

export default App;

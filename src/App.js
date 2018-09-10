import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Navigation />
      </header>
          {/* <ImageUrl />
          <FaceRecognition />
          <Detect /> */}
      </div>
    );
  }
}

export default App;

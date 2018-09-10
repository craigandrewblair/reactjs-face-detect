import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navigation />
          {/* <ImageUrl />
          <FaceRecognition />
          <Detect /> */}
      </div>
    );
  }
}

export default App;

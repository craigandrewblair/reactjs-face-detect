import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import Score from './components/Score/Score';
import Particles from './components/Particles/Particles';

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

  render() {
    return (
      <div className="App" style={{position:"fixed", height:"100vh"}}>
      <Particles />
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        <Score />
        <Navigation />
      </header>
      <main style={{width:"100vw", display:"flex", justifyContent:"center"}}>
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input}/>
        {/* <FaceRecognition /> */}
        {/* <Detect /> */}
      </main>
      </div>
    );
  }
}

export default App;

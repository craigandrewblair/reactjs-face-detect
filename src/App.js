import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import FaceRecognition from './containers/FaceRecognition/FaceRecognition';
import Score from './components/Score/Score';
import Signin from './containers/Signin/Signin';
import Register from './containers/Register/Register';
import Particles from './components/Particles/Particles';
import Clarifai from 'clarifai';

var uniqid = require('uniqid');

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_FACE_KEY
 });
// https://samples.clarifai.com/face-det.jpg
class App extends Component {
  constructor(){
    super();
    this.state = {
        input: '',
        imageUrl: '',
        box: {},
        signin: 'signin',
        refresh: false,
        user: {
          id: '',
          name: '',
          email: '',
          password: '',
          score: 0,
          joindate: new Date()
        }
    }
    
  }

  // FaceRecognition
  onDetectSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
    .then(response => {
      if(response){
        fetch('http://localhost:4000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => response.json())
        .then(user => {
            this.signInHandler(user);
            this.displayImageBox(response);
        })
        .then(data => {
          return this.boxRenderUpdate();
        })
        }
        
      })
  console.log(this.state.user.score);
  }

  // FaceRecognition
  boxRenderUpdate = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
    .then(response => {
        fetch('http://localhost:4000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => response.json())
        .then(data => {
            this.displayImageBox(response);
        })      
      })
  console.log(this.state.user.score);
  }

  displayImageBox = (data) => {
    this.setState({
      imageUrl: this.state.input,
      box: this.calcBoxLocation(data)}
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
    return arr;
  }

  // Page state management
  signOutHandler = () => {
    this.setState({
      signin: 'signin',
    })
  }

  signInHandler = (user) => {
    this.setState({
      signin: 'home',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        score: user.score,
        joindate: new Date()
      }
    })
  }

  registerHandler = () => {
    this.setState({
      signin: 'register'
    })
  }

  registerPageHandler = (user) => {
    this.setState({
      signin: 'home',
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        score: 0,
        joindate: new Date()
      }
    })
    this.loadUser(user);
  }

  // Signin
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  // Register - loads the user to frontend after user has been created on server side
  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        score: user.score,
        joindate: new Date()
      }
    });  
  }

  render() {
    console.log(this.state);
    return (
      <div className="App" style={{minHeight:"100vh"}}>
      {/* <Particles /> */}
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        { this.state.signin === 'home' ? <Score  name={this.state.user.name} score={this.state.user.score} loadUser={this.loadUser} /> : <div></div> }
        <Navigation signOutHandler={this.signOutHandler} signinState={this.state.signin}/>
      </header>
      
      <main style={{width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
      { this.state.signin === 'signin'
      ? 
      <div style={{zIndex:"2"}}>
        <Signin signInHandler={this.signInHandler} registerHandler={this.registerHandler}/> 
      </div>
      : 
      this.state.signin === 'register' 
      ?
      <div style={{zIndex:"2"}}>
        <Register registerPageHandler={this.registerPageHandler} loadUser={this.loadUser}/> 
      </div>
      :
      <div>
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input} onDetectSubmit={this.onDetectSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      }
      </main>

      </div>
    );
  }
}

export default App;

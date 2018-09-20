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

const initialState = {
  input: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tickera.com%2Fblog%2Fwp-content%2Fuploads%2F2014%2F09%2FBusiness-People.jpg&f=1',
  imageUrl: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tickera.com%2Fblog%2Fwp-content%2Fuploads%2F2014%2F09%2FBusiness-People.jpg&f=1',
  box: {},
  signin: 'signin',
  upload: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    score: 0,
    joindate: new Date()
  }
}

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_FACE_KEY
 });
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  onDetectSubmit = () => {
    if(this.state.imageUrl !== this.state.input){
      this.setState({
        imageUrl: this.state.input,
        upload: false
      });
    }else{
      this.setState({ upload: true });
    }
    if(this.state.upload === false){
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
            let score = user;
            this.updateView(response, score);
            this.displayBox(this.calcBoxLocation(response));
          })
        }       
      })
    }
  }    

  updateView = (data, score) => {
    this.setState({
      user: {
        id: this.state.user.id,
        name: this.state.user.name,
        email: this.state.user.email,
        password: this.state.user.password,
        score: score,
        joindate: this.state.user.joindate
      }
    })
  }

  displayBox = (b) => {
    this.setState({
      box: b
    })
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

  signOutHandler = () => {
    this.setState(initialState);
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

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

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
      <Particles />
      <header style={{width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"50px"}}>
        <Logo />
        { this.state.signin === 'home' ? <Score  name={this.state.user.name} score={this.state.user.score}/> : <div></div> }
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
        <ImageUrlForm onInputChange={this.onInputChange} input={this.state.input} onDetectSubmit={this.onDetectSubmit} upload={this.state.upload}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      }
      </main>

      </div>
    );
  }
}

export default App;

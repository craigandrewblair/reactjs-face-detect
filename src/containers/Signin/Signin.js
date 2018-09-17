import React from 'react';

class Signin extends React.Component {

    constructor (props) {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onSignInSubmit = () => {
        fetch('http://localhost:4000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.email === this.state.email && data.password === this.state.password){
                this.props.signInHandler(data);
            }else{
                console.log('Invalid email or password')
            }
        })
    }

    render(){
        return (
            <div>
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSignInSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim black db" onClick={this.props.registerHandler}>Register</a>
                        </div>
                    </div>
                </main>
            </div>
        )    
    }
}

export default Signin;

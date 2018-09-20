import React from 'react';
class Register extends React.Component {

    constructor (props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => this.setState({ name: event.target.value });

    onEmailChange = (event) => this.setState({ email: event.target.value })

    onPasswordChange = (event) => this.setState({ password: event.target.value });

    onRegisterSubmit = () => {
        fetch('http://localhost:4000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.registerPageHandler(user);
            }else{
                console.log('Please provide all fields')
            }
        })
        .catch(console.log());
    }


    render(){
        return (
            <div>
                 <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="user-name"  id="user-name" required/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

}

export default Register;

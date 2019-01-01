import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { config } from './environment'
import firebase from 'firebase'
import { LoginPopup } from './LoginPopup'
import { LoginRedirect } from './LoginRedirect'
import { SignOut } from './SignOut'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in.
    console.log("loginすみ")
    console.log(user.getToken())
  } else {
    // No user is signed in.
    console.log("loginしてない")
  }
})

var user = firebase.auth().currentUser;

if (user) {
  console.log("User is signed in." + user)
} else {
  console.log("No user is signed in." + user)
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    if(e.target.type == 'text') {
      this.setState({
        name: e.target.value
      })
    } else if(e.target.type == 'password') {
      this.setState({
        password: e.target.value
      })
    }
    console.log(e.target)
  }

  handleSubmit(e){

    // alert( `name = ${this.state.name} password = ${this.state.password} ` )
    firebase.auth().createUserWithEmailAndPassword(this.state.name, this.state.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });
    e.preventDefault();
    console.log(e.target)
  }

  render() {
    return (
      <div>
        hello
        <button onClick={ LoginPopup }>Login popup</button>
        <button onClick={ LoginRedirect }>Login redirect</button>
        <button onClick={ SignOut }>SignOut</button>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <label>
            Name:
            <input type="text" onChange={ this.handleChange } value={ this.state.name } placeholder="name"/>
          </label>
          <label>
            Pass:
            <input type="password" onChange={ this.handleChange } value={ this.state.password } placeholder="password"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;

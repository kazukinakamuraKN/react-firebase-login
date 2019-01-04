import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { config } from './environment'
import firebase from 'firebase'
import { AuthAll } from './Authentication'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      login: '',
      userId: ''
    }
  }

  handleChange = (e) => {
    if(e.target.type === 'text') {
      this.setState({
        name: e.target.value
      })
    } else if(e.target.type === 'password') {
      this.setState({
        password: e.target.value
      })
    }
    console.log(e.target)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
    console.log(user)
    if (user) {
      console.log("ログインしてる")
      this.setState({
        login: true,
        userId: user.uid
      })
    } else {
      console.log("ログインしてない")
      this.setState({
        login: false,
        userId: false
      })
    }
  })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <AuthAll data={ this.state }/>
        <div>
          <label>
            Name:
            <input type="text" onChange={ this.handleChange } value={ this.state.name } placeholder="name"/>
          </label>
          <label>
            Pass:
            <input type="password" onChange={ this.handleChange } value={ this.state.password } placeholder="password"/>
          </label>
        </div>
        <p>{ this.state.userId }</p>
      </div>
    );
  }
}

export default App;

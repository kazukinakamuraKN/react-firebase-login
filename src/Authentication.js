import React, { Component } from 'react'
import firebase from 'firebase'

const LoginPopup = () => {

  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider)

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });

}

const SignOut = () => {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("signoutしました")
  }).catch(function(error) {
    // An error happened.
  });
}

const LoginRedirect = () => {

  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);

  firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  const user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
}

export const AuthAll = (props) => {
  const MailAndPassSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(props.data.name, props.data.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });
  }

  const MailAndPassSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(props.data.name, props.data.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  if(props.data.login){
    return(
      <div>
        <button onClick={ SignOut }>SignOut</button>
      </div>
    )
  } else {
    return(
      <div>
        <button onClick={ LoginPopup }>Login popup</button>
        <button onClick={ LoginRedirect }>Login redirect</button>
        <button onClick={ MailAndPassSignUp }>SignUp</button>
        <button onClick={ MailAndPassSignIn }>SignInPassAndMail</button>
      </div>
    )
  }
}
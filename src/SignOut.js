import firebase from 'firebase'

export const SignOut = () => {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
    console.log("signoutしました")
	}).catch(function(error) {
	  // An error happened.
	});
}
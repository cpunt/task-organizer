import { firebase } from './config.js';

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log(error);
  });
}

function signOut() {
  firebase.auth().signOut().then(function() {
    console.log('User signed out');
  }).catch(function(error) {
    console.log(error);
  });
}

export { signIn, signOut };

import { firebase } from './config.js';

function signIn() {
  this.$parent.bgScreen = true;
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

function userStatus() {
  firebase.auth().onAuthStateChanged(user => {
    this.bgScreen = false;
    if(user) {
      this.user = {};
      this.user['email'] = user.email;
      this.user['username'] = user.displayName;
    } else {
      this.user = null;
    }
  });
}

export { signIn, signOut, userStatus };

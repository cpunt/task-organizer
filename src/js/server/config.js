import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCQRcnLrVKPIFIdTV8L6q2Xb-Hc6vdfmtw",
  authDomain: "task-organizer-d4ada.firebaseapp.com",
  databaseURL: "https://task-organizer-d4ada.firebaseio.com",
  projectId: "task-organizer-d4ada",
  storageBucket: "task-organizer-d4ada.appspot.com",
  messagingSenderId: "624863706521",
  appId: "1:624863706521:web:a3fb862cfd5c48cd186708",
  measurementId: "G-RGX7L4RLPY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA8AuzgIjHSLqi0zRYSYLn3Dblu_Ekt34A",
  authDomain: "terra-carphatica.firebaseapp.com",
  databaseURL: "https://terra-carphatica.firebaseio.com",
  projectId: "terra-carphatica",
  storageBucket: "terra-carphatica.appspot.com",
  messagingSenderId: "137721648197"
};

firebase.initializeApp(config);

export default firebase;

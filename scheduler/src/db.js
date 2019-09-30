import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDxqNgiG7wkpDLRo-Ja74GETEwQYDfJgRQ",
    authDomain: "nu-cs497-quickreact.firebaseapp.com",
    databaseURL: "https://nu-cs497-quickreact.firebaseio.com/",
    projectId: "...",
    storageBucket: "....",
    messagingSenderId: "...",
    appId: "..."
  };
firebase.initializeApp(firebaseConfig);
export const db = firebase.database().ref();

  
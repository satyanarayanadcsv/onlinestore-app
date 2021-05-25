import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAwQLd0J77ldLq1ZE3ab562kJ8eyiZcN7o",
    authDomain: "onlinestore-app.firebaseapp.com",
    projectId: "onlinestore-app",
    storageBucket: "onlinestore-app.appspot.com",
    messagingSenderId: "184324323615",
    appId: "1:184324323615:web:dad61ccf4cbd63919bd82a"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export { auth, db, storage}
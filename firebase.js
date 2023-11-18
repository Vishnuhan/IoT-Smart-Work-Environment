// firebase.js
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "ChangeThisToAPIKey",
  
    authDomain: "desksynergy-e97fb.firebaseapp.com",
  
    projectId: "desksynergy-e97fb",
  
    storageBucket: "desksynergy-e97fb.appspot.com",
  
    messagingSenderId: "827956577747",
  
    appId: "1:827956577747:web:59ef8ed5bc0fcbd412db26",
  
    measurementId: "G-D98CY12MJN"
  
  };
  

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

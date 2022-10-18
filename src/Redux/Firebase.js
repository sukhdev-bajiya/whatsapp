import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbQ3xdSbSlEe2f9beSCIREGCKHdjuqrr0",
    authDomain: "whatsapp-clone-messenger.firebaseapp.com",
    projectId: "whatsapp-clone-messenger",
    storageBucket: "whatsapp-clone-messenger.appspot.com",
    messagingSenderId: "126200952820",
    appId: "1:126200952820:web:64c88fcce8e48c24b9eba1",
    measurementId: "G-PDF44J5X12"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };